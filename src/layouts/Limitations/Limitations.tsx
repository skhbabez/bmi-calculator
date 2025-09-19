import styles from "./Limitations.module.css";

const values = [
  {
    id: 1,
    icon: "images/icon-gender.svg",
    title: "Gender",
    text: "The development and body fat composition of girls and boys vary with age. Consequently, a child's age and gender are considered when evaluating their BMI.",
  },
  {
    id: 2,
    icon: "images/icon-age.svg",
    title: "Age",
    text: "In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body fat content.",
  },
  {
    id: 3,
    icon: "images/icon-muscle.svg",
    title: "Muscle",
    text: "BMI may misclassify muscular individuals as overweight or obese, as it doesn't differentiate muscle from fat.",
  },
  {
    id: 4,
    icon: "images/icon-pregnancy.svg",
    title: "Pregnancy",
    text: "Expectant mothers experience weight gain due to their growing baby. Maintaining a healthy pre-pregnancy BMI is advisable to minimise health risks for both mother and child.",
  },
  {
    id: 5,
    icon: "images/icon-race.svg",
    title: "Race",
    text: "Certain health concerns may affect individuals of some Black and Asian origins at lower BMIs than others. To learn more, it is advised to discuss this with your GP or practice nurse.",
  },
];

const Limitations = () => {
  return (
    <section>
      <h2 className="text-l-sb">Limitations of BMI</h2>
      <p>
        Although BMI is often a practical indicator of healthy weight, it is not
        suited for every person. Specific groups should carefully consider their
        BMI outcomes, and in certain cases, the measurement may not be
        beneficial to use.
      </p>
      <ul className={styles.tiplist}>
        {values.map(({ id, icon, title, text }) => (
          <li key={id} className={styles.tip}>
            <img src={icon} width={32} height={32} alt="" />
            <div className={styles.tipscontent}>
              <h3 className="text-ml-sb">{title}</h3>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Limitations;
