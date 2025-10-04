#!/usr/bin/env python3
"""
Quick startup script for the simplified backend
"""
import subprocess
import sys
import os

def start_simple_backend():
    """Start the simplified FastAPI backend server"""
    print("🚀 Starting simplified backend server...")
    
    # Change to backend directory
    os.chdir('finai-backend')
    
    # Start the simplified server
    print("🌐 Starting FastAPI server on http://localhost:8000")
    print("📚 API docs available at http://localhost:8000/docs")
    
    try:
        subprocess.run([sys.executable, 'simple_main.py'], check=True)
    except KeyboardInterrupt:
        print("\n👋 Backend server stopped")
    except Exception as e:
        print(f"❌ Error starting backend: {e}")

if __name__ == "__main__":
    start_simple_backend()
