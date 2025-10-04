#!/usr/bin/env python3
"""
Start the ultra-simple HTTP server (no dependencies)
"""
import subprocess
import sys
import os

def start_simple_server():
    """Start the simple HTTP server"""
    print("🚀 Starting ultra-simple server (no dependencies)...")
    
    # Change to backend directory
    os.chdir('finai-backend')
    
    # Start the simple server
    print("🌐 Starting HTTP server on http://localhost:8000")
    print("📊 Analysis endpoint: http://localhost:8000/analyze")
    
    try:
        subprocess.run([sys.executable, 'simple_server.py'], check=True)
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    start_simple_server()
