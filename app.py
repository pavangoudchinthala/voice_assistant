import streamlit as st
from pathlib import Path
import base64

st.set_page_config(layout="wide")

def img_to_base64(path):
    return base64.b64encode(Path(path).read_bytes()).decode()

# Read files
html = Path("index.html").read_text(encoding="utf-8")
css = Path("style.css").read_text(encoding="utf-8")
js = Path("script.js").read_text(encoding="utf-8")

# Convert images
logo = img_to_base64("logo.jpg")
mic = img_to_base64("mic.svg")
voice = img_to_base64("voice.gif")

# Replace image paths in HTML
html = html.replace('src="logo.jpg"', f'src="data:image/jpeg;base64,{logo}"')
html = html.replace('src="mic.svg"', f'src="data:image/svg+xml;base64,{mic}"')
html = html.replace('src="voice.gif"', f'src="data:image/gif;base64,{voice}"')

# Inject CSS & JS
html = html.replace("</head>", f"<style>{css}</style></head>")
html = html.replace("</body>", f"<script>{js}</script></body>")

st.components.v1.html(
    html,
    height=900,
    scrolling=True
)
