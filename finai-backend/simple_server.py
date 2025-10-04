"""
Ultra-simple HTTP server for retirement analysis
No FastAPI dependencies - just pure Python
"""
import json
import http.server
import socketserver
from urllib.parse import urlparse, parse_qs
import math

class RetirementHandler(http.server.BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        """Handle GET requests"""
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                "message": "AI Retirement Planner API",
                "status": "active",
                "version": "1.0.0"
            }
            self.wfile.write(json.dumps(response).encode())
            
        elif self.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                "status": "healthy",
                "ai_enabled": True,
                "timestamp": "2024-01-01T00:00:00Z"
            }
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        """Handle POST requests"""
        if self.path == '/analyze':
            # Read request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # Parse JSON data
                user_data = json.loads(post_data.decode('utf-8'))
                
                # Calculate retirement analysis
                result = self.calculate_retirement(user_data)
                
                # Send response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(result).encode())
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                error_response = {"success": False, "error": str(e)}
                self.wfile.write(json.dumps(error_response).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def calculate_retirement(self, user_input):
        """Calculate retirement analysis"""
        try:
            # Extract data
            age = user_input.get('age', 30)
            retirement_age = user_input.get('retirement_age', 65)
            annual_income = user_input.get('annual_income', 0)
            monthly_expenses = user_input.get('monthly_expenses', 0)
            current_savings = user_input.get('current_savings', 0)
            monthly_savings = user_input.get('monthly_savings', 0)
            retirement_goal = user_input.get('retirement_goal', 1000000)
            expected_returns = user_input.get('expected_returns', 6.0)
            
            # Calculate years to retirement
            years_to_retirement = retirement_age - age
            
            # Calculate annual savings
            annual_savings = monthly_savings * 12
            
            # Simple compound interest calculation
            projected_corpus = current_savings
            for year in range(years_to_retirement):
                projected_corpus = projected_corpus * (1 + expected_returns/100) + annual_savings
            
            # Calculate readiness
            readiness_percentage = (projected_corpus / retirement_goal) * 100
            shortfall = max(0, retirement_goal - projected_corpus)
            surplus = max(0, projected_corpus - retirement_goal)
            
            return {
                "success": True,
                "projection": {
                    "current_age": age,
                    "retirement_age": retirement_age,
                    "years_to_retirement": years_to_retirement,
                    "current_savings": current_savings,
                    "monthly_savings": monthly_savings,
                    "annual_savings": annual_savings,
                    "expected_returns": expected_returns,
                    "projected_corpus": projected_corpus,
                    "retirement_goal": retirement_goal,
                    "readiness_percentage": readiness_percentage,
                    "shortfall": shortfall,
                    "surplus": surplus
                },
                "analysis": {
                    "summary": f"Your retirement readiness is {readiness_percentage:.1f}%",
                    "readiness_score": readiness_percentage,
                    "corpus": projected_corpus,
                    "confidence_level": "High",
                    "key_insights": [
                        f"You need to save ₹{annual_savings:,.0f} annually",
                        f"Expected corpus: ₹{projected_corpus:,.0f}",
                        f"Goal: ₹{retirement_goal:,.0f}"
                    ],
                    "risk_factors": [
                        "Market volatility",
                        "Inflation risk", 
                        "Longevity risk"
                    ]
                },
                "strategies": [
                    {
                        "title": "Increase Monthly Savings",
                        "description": f"Consider increasing monthly savings to ₹{monthly_savings * 1.2:,.0f}",
                        "impact": "High",
                        "timeframe": "Immediate",
                        "difficulty": "Medium",
                        "expected_benefit": "20% increase in retirement corpus"
                    },
                    {
                        "title": "Optimize Investment Returns",
                        "description": "Consider equity mutual funds for higher returns",
                        "impact": "High",
                        "timeframe": "Long-term",
                        "difficulty": "Low",
                        "expected_benefit": "2-3% higher annual returns"
                    }
                ],
                "overall_priority": "High" if readiness_percentage < 80 else "Medium",
                "implementation_order": ["Increase Monthly Savings", "Optimize Investment Returns"],
                "risk_assessment": "Moderate",
                "ai_enabled": False
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Calculation failed: {str(e)}"
            }

def start_server():
    """Start the HTTP server"""
    PORT = 8000
    
    with socketserver.TCPServer(("", PORT), RetirementHandler) as httpd:
        print(f"🚀 Server running at http://localhost:{PORT}")
        print(f"📊 Retirement analysis endpoint: http://localhost:{PORT}/analyze")
        print(f"❤️  Health check: http://localhost:{PORT}/health")
        print("Press Ctrl+C to stop")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")

if __name__ == "__main__":
    start_server()
