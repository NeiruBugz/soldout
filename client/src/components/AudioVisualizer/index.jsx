/* eslint-disable react/no-string-refs,react/destructuring-assignment */
import React from "react";
import { withRouter } from 'react-router';

class AudioVisualizer extends React.Component {
  componentDidMount() {
    this.createVisualization();
  }

  createVisualization = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const canvas = this.refs.analyzerCanvas;
    const ctx = canvas.getContext("2d");
    const { audio } = this.refs;
    audio.crossOrigin = "anonymous";
    const audioSrc = audioContext.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    audioSrc.connect(audioContext.destination);
    analyser.connect(audioContext.destination);
    
    const renderFrame = () => {
      const freqData = new Uint8Array(analyser.frequencyBinCount);
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(freqData);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(20, 0, 220, 0);
      gradient.addColorStop(1, "#00f");
      gradient.addColorStop(0.75, "#f00");
      gradient.addColorStop(0.25, "#f00");
      gradient.addColorStop(0, "#ff0");
      ctx.fillStyle = gradient;
      const bars = 80;
      for (let i = 0; i < bars; i++) {
        const barX = i * 4;
        const barWidth = 8;
        const barHeight = -(freqData[i] / 2);
        ctx.fillRect(barX, canvas.height, barWidth, barHeight);
      }
    };
    
    if (audioContext.state === 'suspended') {
      this.props.history.push('/');
    }
    
    renderFrame();
  };

  render() {
    return (
      <div id="mp3_player">
        <div id="audio_box">
          <audio ref="audio" autoPlay src={this.props.musicUrl} />
        </div>
        <canvas ref="analyzerCanvas" id="analyzer" />
      </div>
    );
  }
}

export default withRouter(AudioVisualizer);
