import Link from 'next/link';
import styles from '../styles/Gallery.module.css';
import artworks from '../data/artworks.json';

export default function Home() {
    return (
        <div>
            <h1 style={{ textAlign: 'center', padding: '20px' }}>🎨 My Art Gallery</h1>
            <div className={styles.gallery}>
                {artworks.map((art) => (
                    <Link key={art.id} href={`/art/${art.id}`}> 
                        <a className={styles.card}> 
                            <img src={art.image} alt={art.title} />
                            <h3>{art.title}</h3>
                            <p>${art.price}</p>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
}