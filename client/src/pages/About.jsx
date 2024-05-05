import { useEffect } from 'react';
import Typed from 'typed.js';
import '../Styles.css';

export default function About() {
  useEffect(() => {
    // Initialize Typed when the component mounts
    const typeData = new Typed(".role", {
      strings: [
        "Full Stack Developer",
        "And An",
        "Animator",
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    });

    const typedata = new Typed(".vivek", {
      strings: [
        "Full Stack Developer",

      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    });

    const typeSri = new Typed(".Sri", {
      strings: [
        "Ui-Ux Designer",
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    });
    // Cleanup function to destroy Typed instance when component unmounts
    return () => {
      typeData.destroy();
      typeSri.destroy();
      typedata.destroy();
    };
  }, []);
  return (
    <div className="flex flex-col">
      <div className="text-slate-600 font-bold text-3xl lg:text-6xl mx-auto my-7">
        Why PseudoOwner ...
      </div>
      <div>

        <div className="hero-section">
          <div className="hero-left">
            <div className="hero-heading">Free Cancelation</div>
            <div className="hero-description">
              If you are not satisfied with our product, you can cancel your rental anytime, and we'll issue a refund.
            </div>
          </div>
        </div>

        <div className="hero-section">
          <div className="hero-left">
            <div className="hero-heading">24 Hour Support</div>
            <div className="hero-description">
              Our dedicated support team is available 24/7 to assist you with any queries or issues you may have.
            </div>
          </div>
        </div>

      </div>
      <div className="text-slate-600 font-bold text-3xl lg:text-6xl mx-auto my-7">
        Our Founders ...
      </div>

      <div className="hero-section">
        <div className="hero-left">
          <div className="hero-heading">Hi I am Shray Rathore</div>
          <div className="hero-heading hero-subheading">
            {" "}
            I am <span className="role"></span>
          </div>
          <div className="hero-description">
            I am a software developer and here is my portfolio website. Here you
            will learn about my journey as a software developer.
          </div>
        </div>
        <div className="hero-right">

        </div>
      </div>

      <div className="hero-section">
        <div className="hero-left">
          <div className="hero-heading">Hi I am Srishti Ajmera</div>
          <div className="hero-heading hero-subheading">
            {" "}
            I am <span className="Sri"></span>
          </div>
          <div className="hero-description">
            I am a software developer and here is my portfolio website. Here you
            will learn about my journey as a software developer.
          </div>
        </div>
        <div className="hero-right">

        </div>
      </div>

      <div className="hero-section">
        <div className="hero-left">
          <div className="hero-heading">Hi I am Vivek Kumar</div>
          <div className="hero-heading hero-subheading">
            {" "}
            I am <span className="vivek"></span>
          </div>
          <div className="hero-description">
            I am a software developer and here is my portfolio website. Here you
            will learn about my journey as a software developer.
          </div>
        </div>
        <div className="hero-right">

        </div>
      </div>

    </div>
  );
}
