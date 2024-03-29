package cn.stormbirds.expressDelivery.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * cn.stormbirds.express_delivery.entity
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/3 18:45
 */


public class LogisticsTrackingSubBean {
    /**
     * ShipperCode : SF
     * OrderCode : SF201608081055208281
     * LogisticCode : 3100707578976
     * PayType : 1
     * ExpType : 1
     * CustomerName :
     * CustomerPwd :
     * MonthCode :
     * IsNotice : 0
     * Sender : {"Name":"1255760","Tel":"","Mobile":"13700000000","ProvinceName":"广东省","CityName":"深圳市","ExpAreaName":"福田区","Address":"测试地址"}
     * Receiver : {"Name":"1255760","Tel":"","Mobile":"13800000000","ProvinceName":"广东省","CityName":"深圳市","ExpAreaName":"龙华新区","Address":"测试地址2"}
     * Commodity : [{"GoodsName":"书本"}]
     */

    private String ShipperCode;
    private String OrderCode;
    private String LogisticCode;
    private String PayType;
    private String ExpType;
    private String CustomerName;
    private String CustomerPwd;
    private String MonthCode;
    private String IsNotice;
    private SenderBean Sender;
    private ReceiverBean Receiver;
    private List<CommodityBean> Commodity;

    public LogisticsTrackingSubBean(){}

    public LogisticsTrackingSubBean(ExpressTracking expressTracking,
                                    String senderName,
                                    String senderTel,
                                    String senderMobile,
                                    String senderProvinceName,
                                    String senderCityName,
                                    String senderExpAreaName,
                                    String senderAddress){
        ReceiverBean receiverBean = new ReceiverBean();
        receiverBean.setAddress(expressTracking.getReceiverAddress());
        receiverBean.setCityName(expressTracking.getReceiverCity());
        receiverBean.setExpAreaName(expressTracking.getReceiverArea());
        receiverBean.setMobile(expressTracking.getReceiverPhone());
        receiverBean.setName(expressTracking.getReceiverName());
        receiverBean.setProvinceName(expressTracking.getReceiverProvince());
        receiverBean.setTel("");
        SenderBean senderBean = new SenderBean();
        senderBean.setAddress(senderAddress);
        senderBean.setCityName(senderCityName);
        senderBean.setExpAreaName(senderExpAreaName);
        senderBean.setMobile(senderMobile);
        senderBean.setName(senderName);
        senderBean.setProvinceName(senderProvinceName);
        senderBean.setTel(senderTel);
        List<CommodityBean> commodityBeanList = new ArrayList<>();
        commodityBeanList.add(new CommodityBean(expressTracking.getItemTitle(),null,null,null,null,null,null));
        this.ShipperCode = expressTracking.getShipperCode();
        this.OrderCode = null;
        this.LogisticCode = expressTracking.getTrackingNo();
        this.PayType=null;
        this.ExpType = null;
        this.CustomerName = null;
        this.CustomerPwd = null;
        this.MonthCode = null;
        this.IsNotice = null;
        this.Sender = senderBean;
        this.Receiver = receiverBean;
        this.Commodity = commodityBeanList;
    }

    public String getShipperCode() {
        return ShipperCode;
    }

    public void setShipperCode(String ShipperCode) {
        this.ShipperCode = ShipperCode;
    }

    public String getOrderCode() {
        return OrderCode;
    }

    public void setOrderCode(String OrderCode) {
        this.OrderCode = OrderCode;
    }

    public String getLogisticCode() {
        return LogisticCode;
    }

    public void setLogisticCode(String LogisticCode) {
        this.LogisticCode = LogisticCode;
    }

    public String getPayType() {
        return PayType;
    }

    public void setPayType(String PayType) {
        this.PayType = PayType;
    }

    public String getExpType() {
        return ExpType;
    }

    public void setExpType(String ExpType) {
        this.ExpType = ExpType;
    }

    public String getCustomerName() {
        return CustomerName;
    }

    public void setCustomerName(String CustomerName) {
        this.CustomerName = CustomerName;
    }

    public String getCustomerPwd() {
        return CustomerPwd;
    }

    public void setCustomerPwd(String CustomerPwd) {
        this.CustomerPwd = CustomerPwd;
    }

    public String getMonthCode() {
        return MonthCode;
    }

    public void setMonthCode(String MonthCode) {
        this.MonthCode = MonthCode;
    }

    public String getIsNotice() {
        return IsNotice;
    }

    public void setIsNotice(String IsNotice) {
        this.IsNotice = IsNotice;
    }

    public SenderBean getSender() {
        return Sender;
    }

    public void setSender(SenderBean Sender) {
        this.Sender = Sender;
    }

    public ReceiverBean getReceiver() {
        return Receiver;
    }

    public void setReceiver(ReceiverBean Receiver) {
        this.Receiver = Receiver;
    }

    public List<CommodityBean> getCommodity() {
        return Commodity;
    }

    public void setCommodity(List<CommodityBean> Commodity) {
        this.Commodity = Commodity;
    }

    public static class SenderBean {
        /**
         * Name : 1255760
         * Tel :
         * Mobile : 13700000000
         * ProvinceName : 广东省
         * CityName : 深圳市
         * ExpAreaName : 福田区
         * Address : 测试地址
         */

        private String Name;
        private String Tel;
        private String Mobile;
        private String ProvinceName;
        private String CityName;
        private String ExpAreaName;
        private String Address;

        public String getName() {
            return Name;
        }

        public void setName(String Name) {
            this.Name = Name;
        }

        public String getTel() {
            return Tel;
        }

        public void setTel(String Tel) {
            this.Tel = Tel;
        }

        public String getMobile() {
            return Mobile;
        }

        public void setMobile(String Mobile) {
            this.Mobile = Mobile;
        }

        public String getProvinceName() {
            return ProvinceName;
        }

        public void setProvinceName(String ProvinceName) {
            this.ProvinceName = ProvinceName;
        }

        public String getCityName() {
            return CityName;
        }

        public void setCityName(String CityName) {
            this.CityName = CityName;
        }

        public String getExpAreaName() {
            return ExpAreaName;
        }

        public void setExpAreaName(String ExpAreaName) {
            this.ExpAreaName = ExpAreaName;
        }

        public String getAddress() {
            return Address;
        }

        public void setAddress(String Address) {
            this.Address = Address;
        }
    }

    public static class ReceiverBean {
        /**
         * Name : 1255760
         * Tel :
         * Mobile : 13800000000
         * ProvinceName : 广东省
         * CityName : 深圳市
         * ExpAreaName : 龙华新区
         * Address : 测试地址2
         */

        private String Name;
        private String Tel;
        private String Mobile;
        private String ProvinceName;
        private String CityName;
        private String ExpAreaName;
        private String Address;

        public String getName() {
            return Name;
        }

        public void setName(String Name) {
            this.Name = Name;
        }

        public String getTel() {
            return Tel;
        }

        public void setTel(String Tel) {
            this.Tel = Tel;
        }

        public String getMobile() {
            return Mobile;
        }

        public void setMobile(String Mobile) {
            this.Mobile = Mobile;
        }

        public String getProvinceName() {
            return ProvinceName;
        }

        public void setProvinceName(String ProvinceName) {
            this.ProvinceName = ProvinceName;
        }

        public String getCityName() {
            return CityName;
        }

        public void setCityName(String CityName) {
            this.CityName = CityName;
        }

        public String getExpAreaName() {
            return ExpAreaName;
        }

        public void setExpAreaName(String ExpAreaName) {
            this.ExpAreaName = ExpAreaName;
        }

        public String getAddress() {
            return Address;
        }

        public void setAddress(String Address) {
            this.Address = Address;
        }
    }

    public static class CommodityBean {
        /**
         * GoodsName : 书本
         */

        private String GoodsName;
        //String(20)	商品编码	O
        private String GoodsCode;
        //	Int(5)	件数	O
        private Integer Goodsquantity;
        //	Double(10)	商品价格	O
        private Double GoodsPrice;
        //	Double	商品重量kg	O
        private Double GoodsWeight;
        //	String(50)	商品描述	O
        private String GoodsDesc;
        //	Double	商品体积m3	O
        private Double GoodsVol;

        public CommodityBean() {
        }

        public CommodityBean(String goodsName, String goodsCode, Integer goodsquantity, Double goodsPrice, Double goodsWeight, String goodsDesc, Double goodsVol) {
            GoodsName = goodsName;
            GoodsCode = goodsCode;
            Goodsquantity = goodsquantity;
            GoodsPrice = goodsPrice;
            GoodsWeight = goodsWeight;
            GoodsDesc = goodsDesc;
            GoodsVol = goodsVol;
        }

        public String getGoodsName() {
            return GoodsName;
        }

        public void setGoodsName(String GoodsName) {
            this.GoodsName = GoodsName;
        }

        public String getGoodsCode() {
            return GoodsCode;
        }

        public void setGoodsCode(String goodsCode) {
            GoodsCode = goodsCode;
        }

        public Integer getGoodsquantity() {
            return Goodsquantity;
        }

        public void setGoodsquantity(Integer goodsquantity) {
            Goodsquantity = goodsquantity;
        }

        public Double getGoodsPrice() {
            return GoodsPrice;
        }

        public void setGoodsPrice(Double goodsPrice) {
            GoodsPrice = goodsPrice;
        }

        public Double getGoodsWeight() {
            return GoodsWeight;
        }

        public void setGoodsWeight(Double goodsWeight) {
            GoodsWeight = goodsWeight;
        }

        public String getGoodsDesc() {
            return GoodsDesc;
        }

        public void setGoodsDesc(String goodsDesc) {
            GoodsDesc = goodsDesc;
        }

        public Double getGoodsVol() {
            return GoodsVol;
        }

        public void setGoodsVol(Double goodsVol) {
            GoodsVol = goodsVol;
        }
    }
}
