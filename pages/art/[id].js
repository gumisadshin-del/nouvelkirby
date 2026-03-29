import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';

export default function ArtDetail({ art }) {
  const [showForm, setShowForm] = useState(false);

  if (!art) return <p>Loading...</p>;

  return (
    <div style={{padding: '20px'}}>
      <Link href='/'>
        <a>Back to Gallery</a>
      </Link>
      <div style={{marginTop: '20px'}}>
        <img src={art.image} alt={art.title} style={{maxWidth: '600px'}} />
        <h1>{art.title}</h1>
        <p>{art.description}</p>
        <h2>${art.price}</h2>
        <button onClick={() => setShowForm(true)} style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer'}}>Buy Now</button>
      </div>
      {showForm && <PurchaseForm art={art} />}
    </div>
  );
}

function PurchaseForm({ art }) {
  const [formData, setFormData] = useState({ name: '', email: '', address: '', city: '', country: '', zipcode: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Purchase:', {art: art.id, ...formData});
    alert('Thank you! Proceeding to payment...');
  };

  return (
    <div style={{marginTop: '30px', border: '1px solid #ccc', padding: '20px', maxWidth: '500px'}}>
      <h3>Purchase Information</h3>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' placeholder='Full Name' value={formData.name} onChange={handleChange} required style={{width: '100%', padding: '8px', marginBottom: '10px'}} />
        <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required style={{width: '100%', padding: '8px', marginBottom: '10px'}} />
        <input type='text' name='address' placeholder='Address' value={formData.address} onChange={handleChange} required style={{width: '100%', padding: '8px', marginBottom: '10px'}} />
        <input type='text' name='city' placeholder='City' value={formData.city} onChange={handleChange} required style={{width: '100%', padding: '8px', marginBottom: '10px'}} />
        <input type='text' name='country' placeholder='Country' value={formData.country} onChange={handleChange} required style={{width: '100%', padding: '8px', marginBottom: '10px'}} />
        <input type='text' name='zipcode' placeholder='Zip Code' value={formData.zipcode} onChange={handleChange} required style={{width: '100%', padding: '8px', marginBottom: '10px'}} />
        <button type='submit' style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer', background: '#28a745', color: 'white', border: 'none'}}>Complete Purchase</button>
      </form>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const artworks = require('../../data/artworks.json');
  const art = artworks.find(a => a.id === parseInt(params.id));
  return { props: { art }, revalidate: 60 };
}

export async function getStaticPaths() {
  const artworks = require('../../data/artworks.json');
  const paths = artworks.map(art => ({ params: { id: art.id.toString() } }));
  return { paths, fallback: true };
}