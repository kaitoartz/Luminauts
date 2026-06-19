import React from 'react';
import styled from 'styled-components';

const Card = () => {
return (
<StyledWrapper>
<div className="card-container">
<div className="card-effect">
<div className="card-inner">
<div className="card__liquid" />
<div className="card__shine" />
<div className="card__glow" />
<div className="card__content">
<div className="card__badge">TRENDING</div>
<div className="card**image" style={{-bgColor: '#ff6b6b'}} />
<div className="card**text">
<p className="card__title">Dynamic Design</p>
<p className="card__description">Experience interactive hover effects</p>
</div>
<div className="card__footer">
<div className="card__price">$143.99</div>
<div className="card__button">
<svg viewBox="0 0 24 24" width={16} height={16}>
<path fill="currentColor" d="M5 12H19M12 5V19" stroke="currentColor" strokeWidth={2} />
</svg>
</div>
</div>
</div>
</div>
</div>
</div>
</StyledWrapper>
);
}

const StyledWrapper = styled.div`
.card-effect {
perspective: 1000px;
}

.card-inner {
--card-bg: #ffffff;
--card-accent: #ff8a65;
--card-text: #263238;
--card-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
width: 220px;
height: 290px;
background: var(--card-bg);
border-radius: 20px;
position: relative;
overflow: hidden;
transition:
transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1);
box-shadow: var(--card-shadow);
border: 1px solid rgba(255, 255, 255, 0.3);
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
Ubuntu, Cantarell, sans-serif;
transform-style: preserve-3d; /_ Required for 3D effects _/
}

.card-inner:hover {
transform: rotateY(10deg) rotateX(10deg) translateZ(10px);
box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

.card\_\_liquid {
position: absolute;
top: -80px;
left: 0;
width: 300px;
height: 200px;
background: #4a90e2; /_ Liquid color _/
border-radius: 50%;
transform: translateZ(-80px); /_ Position behind the card _/
filter: blur(80px);
transition:
transform 0.7s cubic-bezier(0.36, 0, 0.66, -0.56),
opacity 0.3s ease-in-out;
opacity: 0; /_ Initially hidden _/
}

.card-inner:hover .card\_\_liquid {
transform: translateZ(-50px) translateY(30px) translateX(-20px) rotate(-20deg)
scale(1.2);
opacity: 0.7; /_ Fade in on hover _/
}

.card\_\_shine {
position: absolute;
inset: 0;
background: linear-gradient(
135deg,
rgba(255, 255, 255, 0.1) 30%,
rgba(255, 255, 255, 0.6) 50%,
rgba(255, 255, 255, 0.1) 70%
);
opacity: 0;
transition: opacity 0.4s ease-in-out;
}

.card-inner:hover .card\_\_shine {
opacity: 1;
animation: shine-effect 2s infinite linear;
}

.card\_\_glow {
position: absolute;
inset: -15px;
background: radial-gradient(
circle at 50% 0%,
rgba(255, 138, 101, 0.4) 0%,
rgba(255, 138, 101, 0) 60%
);
opacity: 0;
transition: opacity 0.6s ease-in-out;
}

.card-inner:hover .card\_\_glow {
opacity: 1;
}

.card\_\_content {
padding: 1.5em;
height: 100%;
display: flex;
flex-direction: column;
gap: 1em;
position: relative;
z-index: 2;
}

.card\_\_badge {
position: absolute;
top: 15px;
right: 15px;
background: #f9a825;
color: white;
padding: 0.3em 0.6em;
border-radius: 999px;
font-size: 0.8em;
font-weight: 600;
transform: scale(0.7);
opacity: 0;
transition: all 0.5s ease 0.2s;
}

.card-inner:hover .card\_\_badge {
transform: scale(1);
opacity: 1;
z-index: 1;
}

.card\_\_image {
width: 100%;
height: 120px;
background: var(--bg-color);
border-radius: 15px;
transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
position: relative;
overflow: hidden;
box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.card-inner:hover .card\_\_image {
transform: translateY(-8px) scale(1.05);
}

.card\_\_image::after {
content: "";
position: absolute;
inset: 0;
background: radial-gradient(
circle at 20% 80%,
rgba(255, 255, 255, 0.15) 0%,
transparent 40%
),
repeating-linear-gradient(
-45deg,
rgba(255, 255, 255, 0.05) 0px,
rgba(255, 255, 255, 0.05) 3px,
transparent 3px,
transparent 6px
);
opacity: 0.6;
}

.card\_\_text {
display: flex;
flex-direction: column;
gap: 0.5em;
}

.card\_\_title {
color: var(--card-text);
font-size: 1.2em;
margin: 0;
font-weight: 700;
transition:
color 0.4s ease-in-out,
transform 0.4s ease-in-out;
}

.card-inner:hover .card\_\_title {
color: var(--card-accent);
transform: translateX(3px);
}

.card\_\_description {
color: var(--card-text);
font-size: 0.85em;
margin: 0;
opacity: 0.8;
transition:
opacity 0.4s ease-in-out,
transform 0.4s ease-in-out;
}

.card-inner:hover .card\_\_description {
opacity: 1;
transform: translateX(3px);
}

.card\_\_footer {
display: flex;
justify-content: space-between;
align-items: center;
margin-top: auto;
}

.card\_\_price {
color: var(--card-text);
font-weight: 700;
font-size: 1.1em;
transition:
color 0.4s ease-in-out,
transform 0.4s ease-in-out;
}

.card-inner:hover .card\_\_price {
color: var(--card-accent);
transform: translateX(3px);
}

.card\_\_button {
width: 32px;
height: 32px;
background: var(--card-accent);
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
color: white;
cursor: pointer;
transition:
transform 0.4s ease-in-out,
box-shadow 0.4s ease-in-out;
transform: scale(0.85);
}

.card-inner:hover .card\_\_button {
transform: scale(1);
box-shadow: 0 0 0 5px rgba(255, 138, 101, 0.3);
}

.card-inner:hover .card\_\_button svg {
animation: pulse-button 1.5s infinite;
}

/_ Animations _/
@keyframes shine-effect {
0% {
transform: translateX(-100%);
}
100% {
transform: translateX(200%);
}
}

@keyframes pulse-button {
0% {
transform: scale(1);
}
50% {
transform: scale(1.15);
}
100% {
transform: scale(1);
}
}`;

export default Card;
