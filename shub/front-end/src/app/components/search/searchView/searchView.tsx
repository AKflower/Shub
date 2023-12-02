import styles from './searchView.module.scss'
import CardType from './cardType/cardType'

export default function SearchView() {
    return (
        <div className={styles.result}>
            <p>Type to search...</p>
            <div className={styles.container}>
                
                <div className={styles.title}>
                    <h3 className="">Types</h3>
                </div>
                <div className={styles.types + ' grid grid-cols-4 gap-2'}>
                    <CardType name='Images' />
                    <CardType name='Music' />
                    <CardType name='Video' />
                    <CardType name='PDF' />
                </div>
            </div>
        </div>
    )
}