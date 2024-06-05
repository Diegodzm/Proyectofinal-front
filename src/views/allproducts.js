import { Context } from "../store/context"
import { useContext, useEffect } from "react"
import { useNavigate, } from "react-router-dom";
import './allproducts.css'
import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Container } from 'react-bootstrap';

const Allproducts = () => {
    const { actions, store } = useContext(Context)
    useEffect(() => {
        actions.accessTokenExpired()
        actions.fetchPublishedProducts()
        actions.getProductsbyUser()

        console.log('Published Products:', store.publishedProducts);
        console.log('User Products:', store.userProducts);
    }, []);

    const allproducts = store.publishedProducts
    const userproducts = store.userProducts

    let productdif = allproducts.filter(a => !userproducts.map(b => b.user_id).includes(a.user_id))

    console.log('Filtered Products:', productdif);




    const handleCardClick = (product) => {
        actions.setSelectedProduct(product)
        console.log(store.productIndex)
        const indexProduct = store.publishedProducts.indexOf(product)
        actions.showIndex(indexProduct)

    };

    const isInWishlist = (product) => {
        const { userwishlist } = store;
       
        return userwishlist.some(item => item.name === product.name && item.product_info === product.product_info && item.photo === product.photo);
    };
    



    return <div className="container mt-5">
        <Row>
            {productdif.map((product, index) => (
                <Col className='product_card mb-4' xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card style={{ width: '100%', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                        <Card.Img className="cardimg" variant="top" src={productdif[index].photo} />
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold", fontSize: "18px", color: '#333' }}>{productdif[index].name}</Card.Title>
                            <Card.Text style={{ color: '#666' }}>
                                Descripción: {productdif[index].product_info}
                            </Card.Text>
                            <Card.Text style={{ color: '#666' }}>
                                Precio: {productdif[index].price}
                            </Card.Text>
                            <Link to='/oferta_permuta'>
                                <Button className="bg-success mt-1 mb-2" onClick={() => handleCardClick(product)} style={{ backgroundColor: '#006400', borderColor: '#006400', color: '#fff', width: '100%' }}>
                                    Ofertar
                                </Button>
                            </Link>
                            <Button
                                className="bg-success mt-1 mb-2"
                                onClick={() => actions.addWishedproduct(product)}
                                disabled={isInWishlist(product)} 
                                style={{ backgroundColor: '#006400', borderColor: '#2e8b57', color: '#fff', width: '100%' }}
                            >
                                Agregar a favoritos
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </div>
}
export default Allproducts