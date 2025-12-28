import streamlit as st
from pathlib import Path

st.set_page_config(layout="wide")

html = Path("index.html").read_text(encoding="utf-8")
css = Path("style.css").read_text(encoding="utf-8")
js = Path("script.js").read_text(encoding="utf-8")

html = html.replace("</head>", f"<style>{css}</style></head>")
html = html.replace("</body>", f"<script>{js}</script></body>")

st.components.v1.html(
    html,
    height=900,
    scrolling=True
)
