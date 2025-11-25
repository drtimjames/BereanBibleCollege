#!/bin/bash
# Audio Compression Script
# Compresses audio files to 128kbps MP3 for web delivery
#
# Usage: ./scripts/compress-audio.sh input.wav output.mp3
# Requires: ffmpeg (brew install ffmpeg)

if [ $# -lt 2 ]; then
    echo "Usage: $0 <input-file> <output-file.mp3>"
    echo ""
    echo "Example: $0 sermon.wav sermon-compressed.mp3"
    echo ""
    echo "Supported input formats: wav, aiff, m4a, flac, ogg"
    exit 1
fi

INPUT="$1"
OUTPUT="$2"

if [ ! -f "$INPUT" ]; then
    echo "Error: Input file not found: $INPUT"
    exit 1
fi

echo "Compressing: $INPUT"
echo "Output: $OUTPUT"
echo ""

# Compress to 128kbps MP3 with metadata preservation
ffmpeg -i "$INPUT" \
    -codec:a libmp3lame \
    -b:a 128k \
    -map_metadata 0 \
    -id3v2_version 3 \
    "$OUTPUT"

if [ $? -eq 0 ]; then
    INPUT_SIZE=$(ls -lh "$INPUT" | awk '{print $5}')
    OUTPUT_SIZE=$(ls -lh "$OUTPUT" | awk '{print $5}')
    echo ""
    echo "✅ Compression complete!"
    echo "   Input:  $INPUT_SIZE"
    echo "   Output: $OUTPUT_SIZE"
else
    echo ""
    echo "❌ Compression failed"
    exit 1
fi
