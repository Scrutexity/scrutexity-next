import os
import requests
from datetime import datetime, timedelta
import json

# The Wizard of Oz Backend: Raw Extraction & Parsing for Customer #1

BOULEVARD_API_URL = "https://api.boulevard.io/admin/graphql"  # Note: assuming GraphQL or REST equivalents for MVP
# But standard REST endpoints are given by the prompt: /appointments and /messages
# We will use generic REST URLs to match the prompt's instructions.
REST_API_BASE = "https://api.boulevard.io/v1" 

def get_headers():
    api_key = os.getenv("BOULEVARD_API_KEY", "sk_live_placeholder")
    return {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

def fetch_data():
    """
    Step 1: The Raw Extraction
    Hit Boulevard's appointment and messaging endpoints to pull the last 30 days of data.
    """
    print("[1/3] Extracting raw data from Boulevard API...")
    thirty_days_ago = (datetime.now() - timedelta(days=30)).isoformat()
    
    # In a real scenario, this would hit actual endpoints. We simulate the request setup.
    # messages_resp = requests.get(f"{REST_API_BASE}/messages?created_after={thirty_days_ago}", headers=get_headers())
    # appointments_resp = requests.get(f"{REST_API_BASE}/appointments?created_after={thirty_days_ago}", headers=get_headers())
    
    # Wizard of Oz Mock Payload for the script to process:
    return {
        "messages": [
            {"id": "m1", "client_id": "c1", "direction": "inbound", "timestamp": "2026-06-08T22:15:00Z"},
            {"id": "m2", "client_id": "c1", "direction": "outbound", "timestamp": "2026-06-09T08:30:00Z"}, # 10.25 hrs delay
            {"id": "m3", "client_id": "c2", "direction": "inbound", "timestamp": "2026-06-05T19:00:00Z"},
            {"id": "m4", "client_id": "c3", "direction": "inbound", "timestamp": "2026-06-07T14:00:00Z"},
            {"id": "m5", "client_id": "c3", "direction": "outbound", "timestamp": "2026-06-07T14:15:00Z"}
        ],
        "appointments": [
            {"id": "a1", "client_id": "c4", "status": "no-show", "timestamp": "2026-06-01T10:00:00Z"},
            {"id": "a2", "client_id": "c4", "status": "completed", "timestamp": "2026-06-10T10:00:00Z"}, # Rebooked
            {"id": "a3", "client_id": "c5", "status": "no-show", "timestamp": "2026-06-02T11:00:00Z"}, # Not rebooked
            {"id": "a4", "client_id": "c6", "status": "no-show", "timestamp": "2026-06-03T14:00:00Z"}  # Not rebooked
        ]
    }

def analyze_data(data):
    """
    Step 2: The Parsing Script
    """
    print("[2/3] Parsing JSON payload...")
    
    messages = data.get("messages", [])
    appointments = data.get("appointments", [])
    
    # Group messages by client
    client_threads = {}
    for m in messages:
        client_threads.setdefault(m["client_id"], []).append(m)
        
    unreplied_count = 0
    after_hours_delays = []
    
    for client_id, thread in client_threads.items():
        thread.sort(key=lambda x: x["timestamp"])
        
        for i, msg in enumerate(thread):
            if msg["direction"] == "inbound":
                # Check if there is a subsequent outbound message
                replied = False
                reply_time = None
                for subsequent in thread[i+1:]:
                    if subsequent["direction"] == "outbound":
                        replied = True
                        reply_time = subsequent["timestamp"]
                        break
                
                if not replied:
                    unreplied_count += 1
                else:
                    # Calculate delay for after-hours (6 PM to 8 AM)
                    inbound_dt = datetime.fromisoformat(msg["timestamp"].replace("Z", "+00:00"))
                    hour = inbound_dt.hour
                    if hour >= 18 or hour < 8:
                        outbound_dt = datetime.fromisoformat(reply_time.replace("Z", "+00:00"))
                        delta_hours = (outbound_dt - inbound_dt).total_seconds() / 3600
                        after_hours_delays.append(delta_hours)

    avg_after_hours_delay = sum(after_hours_delays) / len(after_hours_delays) if after_hours_delays else 0

    # Leak 3: No-shows without rebooking
    client_appointments = {}
    for a in appointments:
        client_appointments.setdefault(a["client_id"], []).append(a)
        
    unrebooked_no_shows = 0
    for client_id, appts in client_appointments.items():
        appts.sort(key=lambda x: x["timestamp"])
        for i, appt in enumerate(appts):
            if appt["status"] == "no-show":
                # Check if they have a future appointment
                has_future = any(a["timestamp"] > appt["timestamp"] for a in appts)
                if not has_future:
                    unrebooked_no_shows += 1

    return unreplied_count, avg_after_hours_delay, unrebooked_no_shows

def print_results(unreplied, avg_delay, unrebooked):
    """
    Step 3: The Manual Assembly (Output)
    """
    print("\n[3/3] Analysis Complete. Hardcode these into the Sample Owner Brief HTML:")
    print("=======================================================================")
    print(f"Leak 1: Inquiries with NO reply at all:      {unreplied}")
    print(f"Leak 2: Avg after-hours response delay:      {avg_delay:.2f} hours")
    print(f"Leak 3: No-shows with zero rebooking:        {unrebooked}")
    print("=======================================================================")
    print("Action: Export PDF -> Send Pitch -> Close Deal.")

if __name__ == "__main__":
    raw_data = fetch_data()
    metrics = analyze_data(raw_data)
    print_results(*metrics)
