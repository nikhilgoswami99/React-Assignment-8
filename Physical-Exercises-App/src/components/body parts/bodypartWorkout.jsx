import styles from './bodypartWorkout.module.css'


function Workout(props) {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.exe_info}>
                <h2 className={styles.title}>{props.name}</h2>
                <p className={styles.detail}>
                    <strong>Body Part:</strong> {props.bodyPart}
                </p>
                <p className={styles.detail}>
                    <strong>Target Muscle:</strong> {props.target}
                </p>
                <p className={styles.detail}>
                    <strong>Equipment:</strong> {props.equipment}
                </p>
                <p className={styles.detail}>
                    <strong>Secondary Muscles:</strong> {props.secondaryMuscles.join(', ')}
                </p>
                </div>
                <img
                className={styles.image}
                src={props.gifUrl}
                alt={props.name}
                height={300}
                width={300}
            />
                
            </div>
            
            <div className={styles.instructions}>
                    <strong>Instructions:</strong>
                    <ol className={styles.list}>
                        {props.instructions.map((step, index) => (
                            <li key={index} className={styles.instructionStep}>
                                {step}
                            </li>
                        ))}
                    </ol>
                </div>
        </div>
    );
}


export default Workout;