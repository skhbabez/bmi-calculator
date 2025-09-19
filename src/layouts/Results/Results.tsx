import styles from "./Results.module.css";

const Results = () => (
  <div className={styles.results}>
    <img alt="" src="images/image-man-eating.webp" />
    <div className={styles.resultscontent}>
      <h2 className="text-l-sb">What your BMI result means</h2>
      <p>
        A BMI range of 18.5 to 24.9 is considered a 'healthy weight.'
        Maintaining a healthy weight may lower your chances of experiencing
        health issues later on, such as obesity and type 2 diabetes. Aim for a
        nutritious diet with reduced fat and sugar content, incorporating ample
        fruits and vegetables. Additionally, strive for regular physical
        activity, ideally about 30 minutes daily for five days a week.
      </p>
    </div>
  </div>
);
export default Results;
