import React, { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import {Navbar, Nav, Form} from "react-bootstrap"
import "./NavBar.css"
import { NavLink, Link} from "react-router-dom"

const NavBar = () => {

    const { t } = useTranslation();
    const { i18n } = useTranslation()
    const [language, setLanguage] = useState(false);

    const changeLang = ()=>{
        language ? i18n.changeLanguage('es') : i18n.changeLanguage('en')
        setLanguage(!language);
      }

    return (
        <div className='NavBar '>
        <Navbar  expand="lg">
        <Navbar.Brand ><NavLink  to="/" className='mx-5 py-3 links__style__override dark__theme'>{t('navbar.sections.title')}</NavLink></Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink  to="/users" className='mx-5 py-3 links__style__override dark__theme'>{t('navbar.sections.list')}</NavLink>
                    <NavLink  to="/create" className='mx-5 py-3 links__style__override dark__theme'>{t('navbar.sections.create')}</NavLink>
                </Nav>
                <Form inline>
                {language  ? <Link to="#" onClick={ changeLang} className="links__style__override dark__theme mx-5">EN</Link> : <Link to="#" onClick={changeLang} className="links__style__override dark__theme mx-5">ES</Link>}
                </Form>
            </Navbar.Collapse>
        </Navbar>
       {/*  <Navbar>
             <NavLink  to="/" className='mx-5 py-3'>{t('navbar.sections.title')}</NavLink>
            <Nav className="mr-auto">
                <NavLink  to="/users" className='mx-5 '>{t('navbar.sections.list')}</NavLink>
                <NavLink  to="/create">{t('navbar.sections.create')}</NavLink>
            </Nav>
            <Form inline>
            {language  ? <Link to="#" onClick={ changeLang} className="links__style__override">EN</Link> : <Link to="#" onClick={changeLang} className="links__style__override">ES</Link>}
            
            </Form>
        </Navbar> */}
        </div>
    );
};

export default function App() {
    return (
      <Suspense fallback="loading">
        <NavBar />
      </Suspense>
    )
}