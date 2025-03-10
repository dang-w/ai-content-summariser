from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional
from app.services.summariser import SummariserService

router = APIRouter()

class SummaryRequest(BaseModel):
    text: str = Field(..., min_length=10, description="The text to Summarise")
    max_length: Optional[int] = Field(150, ge=30, le=500, description="Maximum length of the summary")
    min_length: Optional[int] = Field(50, ge=10, le=200, description="Minimum length of the summary")

class SummaryResponse(BaseModel):
    original_text_length: int
    summary: str
    summary_length: int

@router.post("/Summarise", response_model=SummaryResponse)
async def Summarise_text(request: SummaryRequest):
    try:
        summariser = SummariserService()
        summary = summariser.Summarise(
            text=request.text,
            max_length=request.max_length,
            min_length=request.min_length
        )

        return {
            "original_text_length": len(request.text),
            "summary": summary,
            "summary_length": len(summary)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))