import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaTelegram,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./footer.scss";

const Footer = () => {
    const Navigate = useNavigate()

    const linkAboutasHandeler = () => {
        Navigate('/aboutus')
    }

    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem" onClick={linkAboutasHandeler}>عنا</li>
                    <li className="menuItem" onClick={linkAboutasHandeler}>الأسئلة المتداولة</li>
                    <li className="menuItem" onClick={() => Navigate('/')}>الرئيسية</li>
                </ul>
                <div className="infoText">
                صلي علي النبي، يمكن للمشاهدين من خلال منصة موفيز كورنر رؤية مكتبة من الافلام والمسلسلات المحدثة 
                 بستمرار للترفيه، ومعلومات عن الافلام والمسلسلات موفي كورنر سهلت عليك اختيار فيلمك او مسلسلك الجديد، للعلم قدر الاستطاعة تم حجب المحتوي غير الملائم "وانت راعي الله في اختيارك"، فقط تواصل معانا في حال وجود اي مشكلة.
                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <a href="https://t.me/moviesKor" target="_blank" rel="noopener noreferrer">

                        <FaTelegram />
                        </a>
                    </span>
                    <span className="icon">
                        <a className="text" href="https://t.me/moviesKor" target="_blank" rel="noopener noreferrer">

                    دوس هنــا عشــان تقدر تنزل المحتـوي وتدخل قناة تليجرام 
                        </a>
                    </span>
                </div>
                <div className="copyright">
                  <p className="copyright_text">©2023 جميع الحقوق محفوظة</p>
                  <a href="http://mohamedmagdy.surge.sh/" className="by" target="_blank" rel="noreferrer">بـــواسطـــــة مــحمـد مجــدي</a>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;