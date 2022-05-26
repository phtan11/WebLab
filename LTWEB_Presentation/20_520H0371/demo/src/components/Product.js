import React, { Component }  from "react"; 

class Product extends Component{
    state = {
        price: 0
    }
    handleBut = (event) =>{
        this.setState({
            price: event.target.value
        })
    }
    render(){
        return(    
                                    
               <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                   <div className="thumbnail">
                       <img alt="Iphone XS Max" src="https://phuckhangmobile.com/image/iphone-xs-max-xam-900-19438j6.jpg"/>
                       <div className="caption">
                           <h3>IPhone XS MAX</h3>
                           <p>
                               23.000.000 VNĐ
                           </p>
                           <p>
                               <a className="btn btn-primary" >Mua Hàng</a>
                               <button onClick ={(event) => this.handleBut(event)}className="btn btn-primary" >favourite</button>
                           </p>
                       </div>
                   </div>

                   <div className="thumbnail">
                       <img alt="Iphone XS Max" src="https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-xanh-xa-1.jpg"/>
                       <div className="caption">
                           <h3>IPhone 13 Pro Max</h3>
                           <p>
                               53.000.000 VNĐ
                               
                           </p>
                           <p>
                               <a className="btn btn-primary">Mua Hàng</a>
                           </p>
                       </div>
                   </div>

                   <div className="thumbnail">
                       <img alt="Iphone XS Max" src="https://cdn.tgdd.vn/Products/Images/42/236780/iphone-13-mini-hong-1.jpg"/>
                       <div className="caption">
                           <h3>IPhone 13 Mini</h3>
                           <p>
                               18.000.000 VNĐ
                           </p>
                           <p>
                               <a className="btn btn-primary">Mua Hàng</a>
                           </p>
                       </div>
                    </div>

                    <div className="thumbnail">
                       <img alt="Samsung Galaxy S22 Ultra 5G 128GB" src="https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-1-1.jpg"/>
                       <div className="caption">
                           <h3>Samsung Galaxy S22 Ultra 5G 128GB </h3>
                           <p>
                               30.990.000 VNĐ
                           </p>
                           <p>
                               <a className="btn btn-primary">Mua Hàng</a>
                           </p>
                       </div>
                   </div>

                   <div className="thumbnail">
                       <img alt="Samsung Galaxy Z Fold3 5G 256GB" src="https://cdn.tgdd.vn/Products/Images/42/226935/samsung-galaxy-z-fold-3-2-1-org.jpg"/>
                       <div className="caption">
                           <h3>Samsung Galaxy Z Fold3 5G 256GB</h3>
                           <p>
                               33.000.000 VNĐ
                           </p>
                           <p>
                               <a className="btn btn-primary">Mua Hàng</a>
                           </p>
                       </div>
                   </div>

                   <div className="thumbnail">
                       <img alt=" OPPO Reno7 Z 5G " src="https://cdn.tgdd.vn/Products/Images/42/271717/oppo-reno7-z-1-1.jpg"/>
                       <div className="caption">
                           <h3> OPPO Reno7 Z 5G </h3>
                           <p>
                               10.450.000 VNĐ
                           </p>
                           <p>
                               <a className="btn btn-primary">Mua Hàng</a>
                           </p>
                       </div>
                    </div>
                </div>
             
                     
               
               
        );
    }
}

export default Product;
