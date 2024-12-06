import React, { useEffect, useState } from "react";
import styles from "./About.module.css";

// Import logos and profile image
import pythonLogo from "../logos/python.png";
import rLogo from "../logos/r.png";
import sasLogo from "../logos/sas.png";
import javaLogo from "../logos/java.png";
import javascriptLogo from "../logos/javascript.png";
import cssLogo from "../logos/css.png";
import csharpLogo from "../logos/csharp.png";
import cppLogo from "../logos/cplusplus.png";
import delphiLogo from "../logos/delphi.png";
import matlabLogo from "../logos/matlab.png";
import htmlLogo from "../logos/html.png";
import reactLogo from "../logos/react.png";
import flaskLogo from "../logos/flask.png";
import dockerLogo from "../logos/docker.png";
import sqlLogo from "../logos/sql.png";

import instagramLogo from "../logos/instagram.png";
import linkedinLogo from "../logos/linkedin.png";
import githubLogo from "../logos/github.png";
import spotifyLogo from "../logos/spotify.png";
import profileImage from "../extras/profile.png";

const About = () => {
  const [randomAnimation, setRandomAnimation] = useState("");

  // Randomly apply animations on page load
  useEffect(() => {
    const animations = ["fadeIn", "bounceIn", "slideInFromLeft"];
    const randomIndex = Math.floor(Math.random() * animations.length);
    setRandomAnimation(animations[randomIndex]);
  }, []);

  const skills = [
    { name: "Python", confidence: 90, logo: pythonLogo, color: "#3572A5" },
    { name: "R", confidence: 85, logo: rLogo, color: "#276DC3" },
    { name: "SAS", confidence: 80, logo: sasLogo, color: "#005DAC" },
    { name: "Java", confidence: 75, logo: javaLogo, color: "#5382A1" },
    { name: "JavaScript", confidence: 85, logo: javascriptLogo, color: "#F7DF1E" },
    { name: "CSS", confidence: 80, logo: cssLogo, color: "#1572B6" },
    { name: "C#", confidence: 70, logo: csharpLogo, color: "#239120" },
    { name: "C++", confidence: 60, logo: cppLogo, color: "#00599C" },
    { name: "Delphi", confidence: 65, logo: delphiLogo, color: "#E74C3C" },
    { name: "Matlab", confidence: 70, logo: matlabLogo, color: "#FF8C00" },
    { name: "HTML", confidence: 90, logo: htmlLogo, color: "#E34F26" },
    { name: "React", confidence: 85, logo: reactLogo, color: "#61DAFB" },
    { name: "Flask", confidence: 75, logo: flaskLogo, color: "#000000" },
    { name: "Docker", confidence: 80, logo: dockerLogo, color: "#2496ED" },
    { name: "SQL", confidence: 80, logo: sqlLogo, color: "#CC2927" },
  ];

  const socials = [
    { name: "Instagram", url: "https://www.instagram.com/francois0203/", logo: instagramLogo },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/francois-meiring-944a45202", logo: linkedinLogo },
    { name: "GitHub", url: "https://github.com/Francois0203", logo: githubLogo },
    { name: "Spotify", url: "https://open.spotify.com/user/sfg2o0rk75xfki3r2074qjbh0?si=5d6f997e1de64081", logo: spotifyLogo },
  ];

  return (
    <div className={styles.container}>
      <div className={`${styles.profileSection} ${styles[randomAnimation]}`}>
        <img src={profileImage} alt="Profile" className={styles.profileImage} />
        <h1 className={styles.title}>Francois Meiring</h1>
        <p className={styles.subtitle}>MSc Computer Science | Full Stack Developer</p>
      </div>

      <div className={`${styles.section} ${styles[randomAnimation]}`}>
        <h2 className={styles.sectionTitle}>Quick Info</h2>
        <p>💼 Starting at Aquatico as a Full Stack Developer in 2025</p>
        <p>📍 Based in Pretoria, South Africa</p>
        <p>👨‍🎓 22 years old</p>
      </div>

      <div className={`${styles.section} ${styles[randomAnimation]}`}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <p>BSc in Computer Science and Statistics, NWU Potchefstroom</p>
        <p>Honours BSc in Computer Science, NWU Potchefstroom</p>
        <p>Currently pursuing MSc in Computer Science</p>
      </div>

      <div className={`${styles.section} ${styles[randomAnimation]}`}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <div key={index} className={styles.skillItem}>
              <img src={skill.logo} alt={skill.name} className={styles.skillLogo} />
              <span>{skill.name}</span>
              <div className={styles.skillBar}>
                <div
                  className={styles.skillLevel}
                  style={{
                    width: `${skill.confidence}%`,
                    backgroundColor: skill.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.section} ${styles[randomAnimation]}`}>
        <h2 className={styles.sectionTitle}>Hobbies</h2>
        <div className={styles.hobbiesGrid}>
          <div>🎸 Playing guitar</div>
          <div>🏋️ Gym</div>
          <div>🏃 Jogging</div>
          <div>🥾 Hiking</div>
          <div>🎱 8-ball pool</div>
          <div>💻 Programming</div>
          <div>🏸 Squash</div>
          <div>🎨 Painting</div>
        </div>
      </div>

      <div className={`${styles.section} ${styles[randomAnimation]}`}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <p>📱 Cellphone: 065 131 0546</p>
        <p>📧 Email: <a href="mailto:francoismeiring0203@gmail.com" className={styles.link}>francoismeiring0203@gmail.com</a></p>
      </div>

      <div className={`${styles.section} ${styles[randomAnimation]}`}>
        <h2 className={styles.sectionTitle}>Socials</h2>
        <div className={styles.socialsRow}>
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <img src={social.logo} alt={social.name} className={styles.socialLogo} />
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;