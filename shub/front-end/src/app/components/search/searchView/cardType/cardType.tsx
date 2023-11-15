import ImageIcon from '@mui/icons-material/Image';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TheatersIcon from '@mui/icons-material/Theaters';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import styles from './cardType.module.scss'

export default function CardType ({name} : {name:string}) {
    return (
        <div className={styles.container}>
            {name == 'Images' &&  <div className={styles.img}>
                <ImageIcon style={{fontSize : '56px'}}/>
                
                </div>
            }
            {name == 'Music' &&  <div className={styles.img}>
                <VolumeUpIcon style={{fontSize : '56px'}}/>
                
                </div>
            }
            {name == 'Video' &&  <div className={styles.img}>
                <TheatersIcon style={{fontSize : '56px'}}/>
                
                </div>
            }
            {name == 'PDF' &&  <div className={styles.img}>
                <PictureAsPdfIcon style={{fontSize : '56px'}}/>
                
                </div>
            }
            
            <div className={styles.name}>{name}</div>
        </div>
    )
}