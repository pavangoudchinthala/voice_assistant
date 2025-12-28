import streamlit as st
from pathlib import Path

st.set_page_config(layout="wide")

html = Path("index.html").read_text(encoding="utf-8")

# Inject base path so CSS, JS, images load correctly
html = html.replace(
    "<head>",
    "<head><base href='/' />"
)

st.components.v1.html(
    html,
    height=800,
    scrolling=True
)
