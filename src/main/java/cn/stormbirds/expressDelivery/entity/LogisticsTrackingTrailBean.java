package cn.stormbirds.expressDelivery.entity;

import java.util.List;

/**
 * <p>
 * 物流订单推送 轨迹查询结果（101-轨迹查询结果, 107-货款状态）实体类
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/3 18:14
 */


public class LogisticsTrackingTrailBean {
    /**
     * PushTime : 2019-09-03 18:09:04
     * EBusinessID : test1575163
     * Data : [{"LogisticCode":"1234561","ShipperCode":"SF","Traces":[{"AcceptStation":"顺丰速运已收取快件","AcceptTime":"2019-09-03 18:09:04","Remark":""},{"AcceptStation":"货物已经到达深圳","AcceptTime":"2019-09-03 18:09:042","Remark":""},{"AcceptStation":"货物到达福田保税区网点","AcceptTime":"2019-09-03 18:09:043","Remark":""},{"AcceptStation":"货物已经被张三签收了","AcceptTime":"2019-09-03 18:09:044","Remark":""}],"State":"3","EBusinessID":"test1575163","Success":true,"Reason":"","CallBack":"","EstimatedDeliveryTime":"2019-09-03 18:09:04"}]
     * Count : 1
     */

    /**
     * 推送时间
     */
    private String PushTime;
    /**
     * 用户电商ID
     */
    private String EBusinessID;
    /**
     * 推送物流单号轨迹个数
     */
    private String Count;
    private List<DataBean> Data;

    public String getPushTime() {
        return PushTime;
    }

    public void setPushTime(String PushTime) {
        this.PushTime = PushTime;
    }

    public String getEBusinessID() {
        return EBusinessID;
    }

    public void setEBusinessID(String EBusinessID) {
        this.EBusinessID = EBusinessID;
    }

    public String getCount() {
        return Count;
    }

    public void setCount(String Count) {
        this.Count = Count;
    }

    public List<DataBean> getData() {
        return Data;
    }

    public void setData(List<DataBean> Data) {
        this.Data = Data;
    }

    public static class DataBean {
        /**
         * LogisticCode : 1234561
         * ShipperCode : SF
         * Traces : [{"AcceptStation":"顺丰速运已收取快件","AcceptTime":"2019-09-03 18:09:04","Remark":""},{"AcceptStation":"货物已经到达深圳","AcceptTime":"2019-09-03 18:09:042","Remark":""},{"AcceptStation":"货物到达福田保税区网点","AcceptTime":"2019-09-03 18:09:043","Remark":""},{"AcceptStation":"货物已经被张三签收了","AcceptTime":"2019-09-03 18:09:044","Remark":""}]
         * State : 3
         * EBusinessID : test1575163
         * Success : true
         * Reason :
         * CallBack :
         * EstimatedDeliveryTime : 2019-09-03 18:09:04
         */

        /**
         * 快递单号
         */
        private String LogisticCode;
        /**
         * 快递公司编码
         */
        private String ShipperCode;
        /**
         * 物流状态: 0-无轨迹，1-已揽收，2-在途中，3-签收,4-问题件
         */
        private String State;
        /**
         * 商户ID
         */
        private String EBusinessID;
        /**
         * 成功与否：true,false
         */
        private boolean Success;
        /**
         * 失败原因
         */
        private String Reason;
        /**
         * 订阅接口的Bk值
         */
        private String CallBack;
        /**
         * 预计到达时间yyyy-mm-dd
         */
        private String EstimatedDeliveryTime;
        private List<TracesBean> Traces;

        public String getLogisticCode() {
            return LogisticCode;
        }

        public void setLogisticCode(String LogisticCode) {
            this.LogisticCode = LogisticCode;
        }

        public String getShipperCode() {
            return ShipperCode;
        }

        public void setShipperCode(String ShipperCode) {
            this.ShipperCode = ShipperCode;
        }

        public String getState() {
            return State;
        }

        public void setState(String State) {
            this.State = State;
        }

        public String getEBusinessID() {
            return EBusinessID;
        }

        public void setEBusinessID(String EBusinessID) {
            this.EBusinessID = EBusinessID;
        }

        public boolean isSuccess() {
            return Success;
        }

        public void setSuccess(boolean Success) {
            this.Success = Success;
        }

        public String getReason() {
            return Reason;
        }

        public void setReason(String Reason) {
            this.Reason = Reason;
        }

        public String getCallBack() {
            return CallBack;
        }

        public void setCallBack(String CallBack) {
            this.CallBack = CallBack;
        }

        public String getEstimatedDeliveryTime() {
            return EstimatedDeliveryTime;
        }

        public void setEstimatedDeliveryTime(String EstimatedDeliveryTime) {
            this.EstimatedDeliveryTime = EstimatedDeliveryTime;
        }

        public List<TracesBean> getTraces() {
            return Traces;
        }

        public void setTraces(List<TracesBean> Traces) {
            this.Traces = Traces;
        }

        public static class TracesBean {
            /**
             * AcceptStation : 顺丰速运已收取快件
             * AcceptTime : 2019-09-03 18:09:04
             * Remark :
             */

            /**
             * 时间
             */
            private String AcceptStation;
            /**
             * 描述
             */
            private String AcceptTime;
            /**
             * 备注
             */
            private String Remark;

            public String getAcceptStation() {
                return AcceptStation;
            }

            public void setAcceptStation(String AcceptStation) {
                this.AcceptStation = AcceptStation;
            }

            public String getAcceptTime() {
                return AcceptTime;
            }

            public void setAcceptTime(String AcceptTime) {
                this.AcceptTime = AcceptTime;
            }

            public String getRemark() {
                return Remark;
            }

            public void setRemark(String Remark) {
                this.Remark = Remark;
            }
        }
    }
}
