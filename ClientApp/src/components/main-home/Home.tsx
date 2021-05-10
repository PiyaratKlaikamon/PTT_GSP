import * as React from 'react';
import './style.css';

const Home = () => {
    return (
        <div id="P_HOME">
            <div className="pane-navigator">
                <ul className="p-navbody">
                    <li><a><img src={require("./assets/link-request.png")} /></a></li>
                    <li><a><img src={require("./assets/link-approve.png")} /></a></li>
                    <li><a><img src={require("./assets/link-checklist.png")} /></a></li>
                    <li><a><img src={require("./assets/link-admin.png")} /></a></li>
                    <li><a><img src={require("./assets/link-dropship.png")} /></a></li>
                    <li><a><img src={require("./assets/link-receiver.png")} /></a></li>
                </ul>
            </div>
            <div className="pane-hilight">
                <div className="p-cover">
                    <div className="cover-date">
                        <div className="date-day">01</div>
                        <div className="date-month">April</div>
                    </div>
                </div>
                <div className="p-content">
                    <div className="item-filter">
                        <select className="filter-input filter-arctic">
                            <option>- กลุ่มวัสดุ -</option>
                            <option>กลุ่มวัสดุ 1</option>
                            <option>กลุ่มวัสดุ 2</option>
                            <option>กลุ่มวัสดุ 3</option>
                        </select>
                        <select className="filter-input filter-denim">
                            <option>- ประเภทวัสดุ -</option>
                            <option>ประเภทวัสดุ 1</option>
                            <option>ประเภทวัสดุ 2</option>
                            <option>ประเภทวัสดุ 3</option>
                        </select>

                        <a href="#" className="btn btn-primary">
                            รายการเบิกล่าสุด&nbsp;<i className="fa fa-arrow-right"></i>
                        </a>
                    </div>
                    <div className="item-board">
                        <div className="item-box">
                            <div className="box-cover" style={{ backgroundImage: "url(" + require("../../Images/example/helmet.png") + ")" }}></div>
                            <div className="box-title">หมวกนิรภัย</div>
                        </div>
                        <div className="item-box">
                            <div className="box-cover" style={{ backgroundImage: "url(" + require("../../Images/example/glasses.png") + ")" }}></div>
                            <div className="box-title">แว่นนิรภัย</div>
                        </div>
                        <div className="item-box">
                            <div className="box-cover" style={{ backgroundImage: "url(" + require("../../Images/example/headphone.png") + ")" }}></div>
                            <div className="box-title">ครอบหูลดเสียง</div>
                        </div>
                        <div className="item-box">
                            <div className="box-cover" style={{ backgroundImage: "url(" + require("../../Images/example/mask.png") + ")" }}></div>
                            <div className="box-title">หน้ากากกันสารเคมี</div>
                        </div>
                        <div className="item-box">
                            <div className="box-cover" style={{ backgroundImage: "url(" + require("../../Images/example/vest.png") + ")" }}></div>
                            <div className="box-title">เสื้อกั๊กสะท้อนแสง</div>
                        </div>
                        <div className="item-box">
                            <div className="box-cover" style={{ backgroundImage: "url(" + require("../../Images/example/gloves.png") + ")" }}></div>
                            <div className="box-title">ถุงมือนิรภัย</div>
                        </div>
                        <div className="item-box">
                            <div className="box-cover" style={{ backgroundImage: "url(" + require("../../Images/example/belt.png") + ")" }}></div>
                            <div className="box-title">เข็มขัดนิรภัย</div>
                        </div>
                        <div className="item-box">
                            <div className="box-cover" style={{ backgroundImage: "url(" + require("../../Images/example/boots.png") + ")" }}></div>
                            <div className="box-title">รองเท้านิรภัย</div>
                        </div>
                        <div className="item-box">
                            <div className="box-cover" style={{ backgroundImage: "url(" + require("../../Images/example/flashlight.png") + ")" }}></div>
                            <div className="box-title">ไฟฉาย</div>
                        </div>
                        <div className="item-box">
                            <div className="box-cover" style={{ backgroundImage: "url(" + require("../../Images/example/tape.png") + ")" }}></div>
                            <div className="box-title">เทปพันสายไฟ</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
};

export default Home;