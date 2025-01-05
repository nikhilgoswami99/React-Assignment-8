import styles from "./bodypartList.module.css";

function Part(props) {
  return (
    <>
      <div className={styles.name_box}>
        <p className={styles.part_name}>{props.name}</p>
      </div>
    </>
  );
}

export default Part;
