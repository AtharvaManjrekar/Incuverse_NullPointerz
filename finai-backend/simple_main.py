"""
Simplified FastAPI backend for quick integration
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import json

# Initialize FastAPI app
app = FastAPI(
    title="AI Retirement Planner API",
    description="Simplified retirement planning API",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "http://localhost:3002",
        "http://127.0.0.1:3002"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple data models
class UserInput(BaseModel):
    age: int
    retirement_age: int
    annual_income: float
    monthly_expenses: float
    current_savings: float
    monthly_savings: float
    retirement_goal: float
    expected_inflation: float = 3.0
    expected_returns: float = 6.0
    employer_match: float = 0
    social_security_estimate: float = 0
    other_income: float = 0

@app.get("/")
async def root():
    return {
        "message": "AI Retirement Planner API",
        "status": "active",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "ai_enabled": True,
        "timestamp": "2024-01-01T00:00:00Z"
    }

@app.post("/analyze")
async def analyze_retirement(user_input: UserInput):
    """Simple retirement analysis without AI dependencies"""
    try:
        # Basic calculations
        years_to_retirement = user_input.retirement_age - user_input.age
        annual_savings = user_input.monthly_savings * 12
        
        # Simple compound interest calculation
        projected_corpus = user_input.current_savings
        for year in range(years_to_retirement):
            projected_corpus = projected_corpus * (1 + user_input.expected_returns/100) + annual_savings
        
        # Calculate readiness
        readiness_percentage = (projected_corpus / user_input.retirement_goal) * 100
        shortfall = max(0, user_input.retirement_goal - projected_corpus)
        surplus = max(0, projected_corpus - user_input.retirement_goal)
        
        return {
            "success": True,
            "projection": {
                "current_age": user_input.age,
                "retirement_age": user_input.retirement_age,
                "years_to_retirement": years_to_retirement,
                "current_savings": user_input.current_savings,
                "monthly_savings": user_input.monthly_savings,
                "annual_savings": annual_savings,
                "expected_returns": user_input.expected_returns,
                "projected_corpus": projected_corpus,
                "retirement_goal": user_input.retirement_goal,
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
                    f"Goal: ₹{user_input.retirement_goal:,.0f}"
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
                    "description": f"Consider increasing monthly savings to ₹{user_input.monthly_savings * 1.2:,.0f}",
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
            "error": str(e)
        }

@app.post("/suggestions")
async def get_suggestions(user_input: UserInput):
    """Get strategy suggestions"""
    return {
        "success": True,
        "strategies": [
            {
                "title": "Emergency Fund",
                "description": "Build 6 months of expenses as emergency fund",
                "impact": "Medium",
                "timeframe": "3-6 months",
                "difficulty": "Low",
                "expected_benefit": "Financial security"
            }
        ],
        "overall_priority": "High",
        "implementation_order": ["Emergency Fund"],
        "ai_enabled": False
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
