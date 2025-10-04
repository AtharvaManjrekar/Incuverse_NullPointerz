#!/usr/bin/env python3
"""
Quick startup script for the finai-backend
"""
import subprocess
import sys
import os

def start_backend():
    """Start the FastAPI backend server"""
    print("🚀 Starting finai-backend server...")
    
    # Change to backend directory
    os.chdir('finai-backend')
    
    # Install requirements if needed
    print("📦 Installing Python dependencies...")
    subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'], check=True)
    
    # Start the server
    print("🌐 Starting FastAPI server on http://localhost:8000")
    print("📚 API docs available at http://localhost:8000/docs")
    
    try:
        subprocess.run([sys.executable, 'main.py'], check=True)
    except KeyboardInterrupt:
        print("\n👋 Backend server stopped")
    except Exception as e:
        print(f"❌ Error starting backend: {e}")

if __name__ == "__main__":
    start_backend()
