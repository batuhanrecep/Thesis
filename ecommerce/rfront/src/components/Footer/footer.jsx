import "../Footer/footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-sections-1">
                <div className="fs-row-1"><i className="fa-solid fa-truck pe-2 fs-3"></i> Ücretsiz Kargo</div>
                <div className="fs-row-1"><i className="fa-solid fa-ban pe-2 fs-3"></i> 1 gün içinde iptal</div>
                <div className="fs-row-1"><i className="fa-solid fa-shield-halved pe-2 fs-3"></i> %100 Güvenli Ödeme</div>
                <div className="fs-row-1"><i className="fa-solid fa-phone-volume pe-2 fs-3"></i> 24/7 Özel Destek</div>
                <div className="fs-row-1"><i className="fa-solid fa-tags pe-2 fs-3"></i> Günlük Teklifler</div>
            </div>
            <div className="footer-sections-2">
                <div className="fs-row-2">
                    <div className="h5 fw-bold mb-4">
                    Ecommerce - Lorem, ipsum dolor..
                    </div>
                    <div className="footer-text mb-4">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit atque perferendis nulla explicabo!
                    </div>
                    <p className="mb-1 "><i className="fa-solid fa-headphones-simple me-2"></i> 24/7 Yardım Hattı:</p>
                    <p className="fs-3 ms-3">(555) 987 6543</p>
                    <p className="mb-1 "><i className="fa-solid fa-map-location-dot me-2"></i>  Kavaklıdere, Esat Cd. No:61/1, 06660 Çankaya/Ankara</p>
                    <p><i className="fa-regular fa-envelope me-2"></i> support@Ecommerce.com</p>
                </div>
                <div className="fs-row-2">
                <div className="h5 fw-bold mb-4 ms-5">
                Faydalı Linkler
                    </div>
                    <div className="footer-text">
                        <ul className="list-unstyled ms-5">
                            <li>Hakkımızda</li>
                            <li className="mt-2">Yardım Merkezi</li>
                            <li className="mt-2">Kariyer</li>
                            <li className="mt-2">Politika</li>
                            <li className="mt-2">Flash İndirimler</li>
                            <li className="mt-2">Resmi</li>
                            <li className="mt-2">Site Haritası</li>
                        </ul>
                    </div>
                </div>
                <div className="fs-row-2 ">
                    <div className="h5 fw-bold mb-4 ms-5">
                    Yardım Merkezi
                    </div>
                    <div className="footer-text ms-5">
                            <ul className="list-unstyled">
                                <li>Ödeme</li>
                                <li className="mt-2">Kargo</li>
                                <li className="mt-2">Ürün İade</li>
                                <li className="mt-2">SSS</li>
                                <li className="mt-2">Kasa</li>
                                <li className="mt-2">Diğer Sorunlar</li>
                            </ul>
                        </div>
                </div>
                <div className="fs-row-2">
                <div className="h5 fw-bold mb-4 ms-5">
                    Satış Merkezi
                    </div>
                    <div className="footer-text ms-5">
                            <ul className="list-unstyled">
                                <li>Satış Yapın</li>
                                <li className="mt-2">Ortaklık Programı</li>
                                <li className="mt-2">Tedarikçiler</li>
                                <li className="mt-2">Politika</li>
                                <li className="mt-2">Erişilebilirlik</li>
                                <li className="mt-2">Reklam Verin</li>
                            </ul>
                        </div>
                </div>
                <div className="fs-row-2 ">
                    <div className="h5 fw-bold mb-4 ms-5">
                    Haber Bülteni
                    </div>
                    <div className="footer-text mb-4 ms-5">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit atque perferendis nulla explicabo!
                    </div>

                </div>
            </div>
            <div className="footer-sections-3">
                <div className="fs-row-3">©2023 Ecommerce Tüm Hakları Saklıdır</div>
                <div className="fs-row-3">
                    <img src="src/assets/images/footer-payment.png"></img>
                </div>
            </div>
        </footer>
    )
}

export default Footer;