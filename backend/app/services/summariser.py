from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

class SummariserService:
    def __init__(self):
        # Initialize with a smaller model for faster loading
        model_name = "facebook/bart-large-cnn"
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

        # Move to GPU if available
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model.to(self.device)

    def Summarise(self, text, max_length=150, min_length=50):
        """
        Summarise the given text using the loaded model.

        Args:
            text (str): The text to Summarise
            max_length (int): Maximum length of the summary
            min_length (int): Minimum length of the summary

        Returns:
            str: The generated summary
        """
        # Ensure text is within model's max token limit
        inputs = self.tokenizer(text, return_tensors="pt", truncation=True, max_length=1024)
        inputs = inputs.to(self.device)

        # Generate summary
        summary_ids = self.model.generate(
            inputs["input_ids"],
            max_length=max_length,
            min_length=min_length,
            num_beams=4,
            length_penalty=2.0,
            early_stopping=True
        )

        summary = self.tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        return summary