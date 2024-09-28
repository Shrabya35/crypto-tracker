import React, { useEffect, useState } from "react";
import "./App.css";
import "./spinner.css";
import axios from "axios";
import {
  AiOutlineDiscord,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineYoutube,
  AiOutlineWallet,
} from "react-icons/ai";
import { LiaTelegramPlane } from "react-icons/lia";
import { FiFacebook } from "react-icons/fi";
import { GiMonkey, GiToken } from "react-icons/gi";
import { SiIconfinder } from "react-icons/si";
import Bitcoin from "./assets/bitcoin.png";
import Etherium from "./assets/etherium.png";
import BtcFooter1 from "./assets/btcbundle.png";
import BtcFooter2 from "./assets/btcbundle2.png";

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get("https://api.coincap.io/v2/assets");
        setCryptoData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cryptoData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];

  for (let i = 1; i <= 5; i++) {
    pageNumbers.push(i);
  }

  const perColor = (per) => {
    if (per > 0) {
      return "#0ecb81";
    } else if (per < 0) {
      return "#d80000";
    } else {
      return "white";
    }
  };

  const cryptoHome = cryptoData.slice(0, 4);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="Navbar">
        <div className="nav-left">
          <div className="nav-logo">Koindo</div>
        </div>
        <div className="nav-mid">
          <a href="#Home" className="nav-mid-a">
            Home
          </a>
          <a href="#Market" className="nav-mid-a">
            Market
          </a>
          <a href="#Choose" className="nav-mid-a">
            Choose Us
          </a>
          <a href="#Join" className="nav-mid-a">
            Join
          </a>
        </div>
        <div className="nav-right">
          <AiOutlineDiscord />
          <LiaTelegramPlane />
          <AiOutlineMenu className="nav-toggle" onClick={toggleMenu} />
        </div>
        <div className={`nav-sidebar ${isMenuOpen ? "open" : ""}`}>
          <div className="nav-mob-up">
            <div className="nav-mob-icon">
              <AiOutlineClose className="close-btn" onClick={closeMenu} />
            </div>
          </div>
          <div className="sidebar-menu flex">
            <div className="nav-items" onClick={closeMenu}>
              <a href="#Home">Home</a>
            </div>
            <div className="nav-items" onClick={closeMenu}>
              <a href="#Market">Market</a>
            </div>
            <div className="nav-items" onClick={closeMenu}>
              <a href="#Choose">Choose Us</a>
            </div>
            <div className="nav-items" onClick={closeMenu}>
              <a href="#Join">Join Us</a>
            </div>
          </div>
        </div>
      </div>
      <div className="Home flex" id="Home">
        <div className="home-container flex">
          <div className="home-main">
            Track And Trade
            <span className="colored-text">Crypto Currencies</span>
            <a href="#Market" className="home-btn">
              See Price
            </a>
            <div className="home-absolute home-absolute1">
              <img src={Bitcoin} alt="bitcoin" />
            </div>
            <div className="home-absolute home-absolute2">
              <img src={Etherium} alt="etherium" />
            </div>
          </div>
          <div className="home-det flex">
            {loading && (
              <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
              </div>
            )}
            {error && <div>{error}</div>}
            {cryptoHome.map((crypto) => {
              const color = perColor(parseFloat(crypto.changePercent24Hr));
              return (
                <div className="home-det-container flex" key={crypto.id}>
                  <div className="home-det-img">
                    <img
                      src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                      alt={`${crypto.name} logo`}
                    />
                  </div>
                  <div className="home-det-top flex">
                    <div className="home-det-name">{crypto.name}</div>
                    <div className="home-det-per" style={{ color: color }}>
                      {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
                    </div>
                  </div>
                  <div className="home-det-bottom">
                    {`$${Number(crypto.priceUsd)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="Market section" id="Market">
        <div className="market-header">Market Update</div>
        <div className="table-container">
          <table className="table">
            <thead className="table-head">
              <tr>
                <th className="start">Coin</th>
                <th className="mid">Price</th>
                <th className="mid">24h Change</th>
                <th className="end">Market Cap</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {currentItems.map((crypto) => {
                const color = perColor(parseFloat(crypto.changePercent24Hr));
                return (
                  <tr key={crypto.id}>
                    <td className="start">
                      <img
                        src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                        alt={`${crypto.name} logo`}
                      />
                      <div className="table-crypto-name">{crypto.name}</div>
                    </td>
                    <td className="mid">
                      ${parseFloat(crypto.priceUsd).toFixed(2)}
                    </td>
                    <td className="mid" style={{ color: color }}>
                      {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
                    </td>
                    <td className="end">
                      ${parseInt(crypto.marketCapUsd).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="table-pagination flex">
          {pageNumbers.map((number) => (
            <div
              key={number}
              className={` flex page-item ${
                currentPage === number ? "active" : ""
              }`}
              onClick={() => paginate(number)}
            >
              <a href="#!" className="page-link">
                {number}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="Choose section flex " id="Choose">
        <div className="choose-header">
          Why <span className="colored-text">Koindo</span>
        </div>
        <div className="choose-container">
          <div className="choose-box to-left">
            <div className="choose-box-left">
              <AiOutlineWallet />
            </div>
            <div className="choose-box-right">
              <div className="cbr-title">CONNECT YOUR WALLET</div>
              <div className="cbr-desc">
                Use Trust Wallet, Metamask or to connect to the app.
              </div>
            </div>
          </div>
          <div className="choose-box to-right">
            <div className="choose-box-left">
              <GiMonkey />
            </div>
            <div className="choose-box-right">
              <div className="cbr-title">RECEIVE YOUR OWN NFTS</div>
              <div className="cbr-desc">
                Invest all your crypto at one place on one platform.
              </div>
            </div>
          </div>
          <div className="choose-box to-left">
            <div className="choose-box-left">
              <GiToken />
            </div>
            <div className="choose-box-right">
              <div className="cbr-title">TAKE A MARKET TO SELL</div>
              <div className="cbr-desc">
                Discover, collect the right crypto collections to buy or sell.
              </div>
            </div>
          </div>
          <div className="choose-box to-right">
            <div className="choose-box-left">
              <SiIconfinder />
            </div>
            <div className="choose-box-right">
              <div className="cbr-title">DRIVE YOUR COLLECTION</div>
              <div className="cbr-desc">
                We make it easy to Discover, Invest and manage.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Join flex" id="Join">
        <div className="join-main home-main">
          Join Us Via
          <span className="colored-text">Discord</span>
          <a href="#Market" className="home-btn join-btn">
            Join
          </a>
          <div className="home-absolute join-absolute1 home-absolute1">
            <img src={Bitcoin} alt="bitcoin" />
          </div>
          <div className="home-absolute join-absolute2 home-absolute2">
            <img src={Etherium} alt="etherium" />
          </div>
        </div>
      </div>
      <div className="Footer section flex">
        <div className="footer-left">
          <img src={BtcFooter2} alt="btc" />
        </div>
        <div className="footer-mid flex">
          <div className="footer-mid-top nav-right">
            <AiOutlineDiscord />
            <AiOutlineYoutube />
            <FiFacebook />
            <LiaTelegramPlane />
          </div>
          <div className="footer-mid-bottom nav-right">
            <p className="nav-mid-a">Privacy</p>
            <p className="nav-mid-a">Terms of Use</p>
          </div>
        </div>
        <div className="footer-right">
          <img src={BtcFooter1} alt="btc" />
        </div>
      </div>
    </>
  );
};

export default App;
