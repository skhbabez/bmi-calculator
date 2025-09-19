import styles from "./Tips.module.css";
const values = [
  {
    id: 1,
    icon: "images/icon-eating.svg",
    title: "Healthy eating",
    text: "Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood.",
  },
  {
    id: 2,
    icon: "images/icon-exercise.svg",
    title: "Regular exercise",
    text: "Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.",
  },
  {
    id: 3,
    icon: "images/icon-sleep.svg",
    title: "Adequate sleep",
    text: "Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.",
  },
];

const Tips = () => {
  return (
    <ul className={styles.tiplist} aria-label="Health tips">
      {values.map(({ id, icon, title, text }) => (
        <li key={id} className={styles.tip}>
          <img src={icon} width={64} height={64} alt="" />
          <div className={styles.tipscontent}>
            <h3 className="text-ml-sb">{title}</h3>
            <p>{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Tips;
