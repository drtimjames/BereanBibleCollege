import os
from PyPDF2 import PdfMerger

# Folder containing your TOC PDFs
toc_folder = "images/dr-tim-james"

# Define the TOC files for each book in the correct order
books_tocs = {
    "Presuppositions": ["Presuppositions-TOC1.pdf", "Presuppositions-TOC2.pdf"],
    "Tree of Life": ["Tree-of-Life-TOC1.pdf", "Tree-of-Life-TOC2.pdf"],
    "God's Whispers": ["Gods-Whispers-TOC1.pdf", "Gods-Whispers-TOC2.pdf", "Gods-Whispers-TOC3.pdf"],
    "The Day of the Lord Vol 1": ["The-Day-of-the-Lord-V1-TOC1.pdf", "The-Day-of-the-Lord-V1-TOC2.pdf"],
    "The Day of the Lord Vol 2": ["The-Day-of-the-Lord-V2-TOC1.pdf", "The-Day-of-the-Lord-V2-TOC2.pdf"]
}

# Output folder for merged PDFs
output_folder = toc_folder

for book, toc_files in books_tocs.items():
    merger = PdfMerger()
    for toc_file in toc_files:
        toc_path = os.path.join(toc_folder, toc_file)
        if os.path.exists(toc_path):
            merger.append(toc_path)
        else:
            print(f"Warning: {toc_file} not found in {toc_folder}")
    output_file = os.path.join(output_folder, f"{book}-TOC.pdf")
    merger.write(output_file)
    merger.close()
    print(f"Merged TOC for '{book}' into {output_file}")

