/*
 Navicat Premium Data Transfer

 Source Server         : 本地测试
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : express_db

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 06/09/2019 19:17:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for express_tracking
-- ----------------------------
DROP TABLE IF EXISTS `express_tracking`;
CREATE TABLE `express_tracking` (
  `id` bigint(20) NOT NULL COMMENT '主键',
  `platform_id` bigint(20) NOT NULL COMMENT '发货平台在本系统中id对应user表id',
  `platform_order_id` char(24) COLLATE utf8mb4_general_ci NOT NULL COMMENT '发货平台订单',
  `item_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '物品名称',
  `receiver_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '收货人姓名',
  `receiver_phone` char(11) COLLATE utf8mb4_general_ci NOT NULL COMMENT '收货人电话',
  `receiver_province` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '收货人省份',
  `receiver_city` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '收货人城市',
  `receiver_area` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '收货人地区',
  `receiver_address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '详细收货地址',
  `item_num` int(11) NOT NULL COMMENT '物品个数',
  `tracking_no` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '物流编号',
  `shipper_code` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '物流公司代码',
  `tracking_status` tinyint(4) NOT NULL COMMENT '订单追踪状态0-录入、1-订阅追踪中、2追踪完成',
  `Logistic_status` tinyint(4) NOT NULL COMMENT '快递订单状态0-只录入未知、1-订单状态正常、2-订单状态异常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of express_tracking
-- ----------------------------
BEGIN;
INSERT INTO `express_tracking` VALUES (63215404729896960, 62454224285470720, 'E20190830074835004400012', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '小张仙女', '13382507976', '江苏省', '苏州市', '相城区', '江苏省苏州市相城区御苑家园69幢501', 1, '4057968753205', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404742479872, 62454224285470720, 'E20190830071337060000018', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '刘杉杉', '15732232160', '河北省', '保定市', '徐水区', '河北省保定市徐水区巩固庄村', 1, '4057968756588', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404755062784, 62454224285470720, 'E20190830030616057000001', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '王前', '15882329769', '四川省', '德阳市', '旌阳区', '四川省德阳市旌阳区龙泉山南路二段29号金路花园', 1, '4057968761246', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404771840000, 62454224285470720, 'E20190829223735099400162', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '冯文', '16609087799', '新疆维吾尔自治区', '克孜勒苏柯尔克孜自治州', '阿图什市', '新疆维吾尔自治区克孜勒苏柯尔克孜自治州阿图什市天山路 民族家属院', 1, '4057968757305', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404784422912, 62454224285470720, 'E20190829223318056700179', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '郭海月', '15119296554', '广东省', '茂名市', '化州市', '广东省茂名市化州市那务镇 丽人堂', 1, '4057968753446', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404797005824, 62454224285470720, 'E20190829221538081300013', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '万菊香', '18368793696', '湖北省', '荆州市', '洪湖市', '湖北省荆州市洪湖市曹市镇永利村七组', 1, '4057968754863', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404805394432, 62454224285470720, 'E20190829220927003600211', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '田孙华', '18996438293', '重庆市', '重庆市', '永川区', '重庆市重庆市永川区化工路929号清华苑15幢', 1, '4057968761537', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404817977344, 62454224285470720, 'E20190829220754071700151', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '杨丹萍', '15958388720', '浙江省', '湖州市', '德清县', '浙江省湖州市德清县武康镇塔山街768号', 1, '4057968761648', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404826365952, 62454224285470720, 'E20190829214320014400042', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '梁振宇', '15354882488', '内蒙古自治区', '呼和浩特市', '赛罕区', '内蒙古自治区呼和浩特市赛罕区航城路民航小区', 1, '4057968757100', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404838948864, 62454224285470720, 'E20190829214306057000052', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '苏利文', '13798305889', '广东省', '深圳市', '南山区', '广东省深圳市南山区沙河街道香山东街15号华山村住宅区3栋', 1, '4057968754677', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404851531776, 62454224285470720, 'E20190829213348022500151', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '倪钰烨', '17858934898', '浙江省', '杭州市', '萧山区', '浙江省杭州市萧山区益农镇东联村18组2号', 1, '4057968744640', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404859920384, 62454224285470720, 'E20190829203439082400115', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '胡伟', '15090960247', '湖北省', '襄阳市', '襄州区', '湖北省襄阳市襄州区新区9栋1单元201', 1, '4057968744707', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404872503296, 62454224285470720, 'E20190829190345074800009', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '张火火', '13305507774', '浙江省', '嘉兴市', '南湖区', '浙江省嘉兴市南湖区凌公塘路御树湾7栋', 1, '4057968765228', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404885086208, 62454224285470720, 'E20190829185201069400021', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '刘建伦', '13886915591', '湖北省', '荆门市', '掇刀区', '湖北省荆门市掇刀区关帝路145号', 1, '4057968744831', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404897669120, 62454224285470720, 'E20190829174521053200063', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '花老板', '15154280060', '河南省', '开封市', '鼓楼区', '河南省开封市鼓楼区金明大道与汉兴路交汇处东南角国投大厦新华保险公司', 1, '4057968762119', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404914446336, 62454224285470720, 'E20190829161237076600029', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '魏宗乐', '18581104775', '重庆市', '重庆市', '长寿区', '重庆市重庆市长寿区碧园路53号 凤城华府', 2, '4057968762255', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404922834944, 62454224285470720, 'E20190829154334046100041', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '郭俊兴', '18050813081', '福建省', '泉州市', '石狮市', '福建泉州市石狮市湖滨街道长福路31号', 1, '4057968762400', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404935417856, 62454224285470720, 'E20190829154207029600073', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '张源清', '13799746353', '福建省', '厦门市', '思明区', '福建省厦门市思明区柯厝路376-378号源泉山庄C区1-2号楼 泊寓(环岛山庄店)B栋', 1, '4057968762519', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404943806464, 62454224285470720, 'E20190829153329023600013', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '李玲玲', '15576831823', '广东省', '深圳市', '南山区', '广东省深圳市南山区恒立心花园1栋B座1004', 1, '4057968770233', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404956389376, 62454224285470720, 'E20190829143604032400092', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '陈裕', '13713478062', '广东省', '东莞市', '樟木头镇', '广东省东莞市樟木头镇御景花园夏威夷22座7D', 1, '4057968765593', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404964777984, 62454224285470720, 'E20190829130912000500082', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '泽宇', '18698457376', '内蒙古自治区', '赤峰市', '宁城县', '内蒙古自治区赤峰市宁城县内蒙古赤峰市宁城县大宁路C段东侧北环街北侧富润园小区1楼04061室', 1, '4057968762884', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404977360896, 62454224285470720, 'E20190829130825068100041', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '王伟伟', '18661716801', '山东省', '青岛市', '即墨区', '山东省青岛市即墨区环秀街道办事处文化路中交中央公元1期物业办公室', 1, '4057968762931', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404985749504, 62454224285470720, 'E20190829125848038400007', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '彭L', '13924481815', '广东省', '梅州市', '兴宁市', '广东省梅州市兴宁市社保局', 1, '4057968770405', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215404998332416, 62454224285470720, 'E20190829124745063300063', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '杨红', '13847237303', '内蒙古自治区', '包头市', '昆都仑区', '内蒙古自治区包头市昆都仑区青年路9号佳园小区17-12', 1, '4057968763117', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405006721024, 62454224285470720, 'E20190829124257005400049', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '陈玺', '15811408748', '广东省', '广州市', '番禺区', '广东省广州市番禺区南村镇兴业大道1008号 剑桥郡·悦君澜三街三栋四零一', 1, '4057968763353', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405019303936, 62454224285470720, 'E20190829121727016300023', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '徐菲', '18965715704', '福建省', '泉州市', '鲤城区', '福建省泉州市鲤城区常泰街道新塘电脑旁', 1, '4057968766704', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405027692544, 62454224285470720, 'E20190829121451089200006', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '韩英霞', '13513371929', '河北省', '石家庄市', '裕华区', '河北省石家庄市高新区天山大街与学苑路十字路口往南200米路东，宋营派出所', 1, '4057968770613', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405036081152, 62454224285470720, 'E20190829121306056900027', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '丁恩华', '15722867808', '上海市', '上海市', '浦东新区', '上海市上海市浦东新区浦建路365弄金龙东苑4号502室', 1, '4057968767111', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405044469760, 62454224285470720, 'E20190829115710083100005', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '刘莉', '15521411547', '广东省', '广州市', '番禺区', '广东省广州市番禺区华南师范大学大学城校区生活南区', 1, '4057968767317', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405057052672, 62454224285470720, 'E20190829115326017500023', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '刘凯', '13040780117', '浙江省', '绍兴市', '柯桥区', '浙江省绍兴市柯桥区湖西路96号 中国轻纺城(北联)窗帘布艺市场三区一楼1610号', 1, '4057968758992', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405065441280, 62454224285470720, 'E20190829120153082100099', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '崔先生', '13750026402', '广东省', '珠海市', '香洲区', '广东省珠海市香洲区香洲高新区翠湖香山玉兰苑5栋2单元2006', 1, '4057968763813', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405073829888, 62454224285470720, 'E20190829115752076300053', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '苗先生', '15604848803', '黑龙江省', '哈尔滨市', '道里区', '黑龙江省哈尔滨市道里区荣耀上城B座6单元1201', 1, '4057968764035', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405082218496, 62454224285470720, 'E20190829115630082100023', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '段纯', '13810045943', '北京市', '北京市', '朝阳区', '北京市北京市朝阳区建华南路永安南里八楼304', 1, '4057968767613', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405094801408, 62454224285470720, 'E20190829115621018600053', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '李先森', '15521101115', '广东省', '广州市', '番禺区', '广东省广州市番禺区植村五路东新五巷1号 菜鸟驿站(广州植村五路东一区4巷1号店)', 1, '4057968759150', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405103190016, 62454224285470720, 'E20190829115542078500037', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '敖立冠', '15217553146', '广东省', '广州市', '海珠区', '广东省广州市海珠区石伦里大街20号', 1, '4057968767717', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405111578624, 62454224285470720, 'E20190829115343078500028', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '敖乖乖', '15217553146', '广东省', '阳江市', '江城区', '广东省阳江市江城区东风三路湖畔花苑朗月阁1403', 1, '4057968768155', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405119967232, 62454224285470720, 'E20190829115149044800055', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '曾艳', '18608630085', '广东省', '广州市', '番禺区', '广东省广州市番禺区大石街道植村二路十七巷', 1, '4057968759429', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405132550144, 62454224285470720, 'E20190829114803074500065', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '刘振通', '13737080046', '广西壮族自治区', '南宁市', '江南区', '广西壮族自治区南宁市江南区亭洪路48-1 万达华府C区', 1, '4057968768386', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (63215405140938752, 62454224285470720, 'E20190829114729044900049', '【爆汁酸甜】陕西周至“徐香”猕猴桃 皮薄多汁 果肉细腻 富含膳食纤维/维生素C 5斤装', '邵帅', '18301691685', '北京市', '北京市', '海淀区', '北京市北京市海淀区宣海家园2号楼5单元402', 1, '4057968768457', 'YTO', 0, 1);
INSERT INTO `express_tracking` VALUES (1169497652680994817, 62454224285470720, '62454224285470720', '商品', '徐保军', '17792294757', '陕西省', '西安市', '未央区', '陕西省西安市未央区玄武东路西岸国际花园二期', 10, '75171763076673', 'ZTO', 0, 1);
COMMIT;

-- ----------------------------
-- Table structure for logistic_code_record
-- ----------------------------
DROP TABLE IF EXISTS `logistic_code_record`;
CREATE TABLE `logistic_code_record` (
  `id` bigint(20) NOT NULL,
  `logistic_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '快递单号',
  `shipper_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '快递公司编码',
  `state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '物流状态: 0-无轨迹，1-已揽收，2-在途中，3-签收,4-问题件',
  `e_business_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '商户ID',
  `success` bit(1) NOT NULL DEFAULT b'0' COMMENT '成功与否',
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '失败原因',
  `callback` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订阅接口的Bk值',
  `estimated_delivery_time` date NOT NULL DEFAULT '0000-01-01' COMMENT '预计到达时间yyyy-mm-dd',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of logistic_code_record
-- ----------------------------
BEGIN;
INSERT INTO `logistic_code_record` VALUES (63181399355691008, '75171763076673', 'ZTO', 3, '1575163', b'1', '', '', '2019-09-05');
COMMIT;

-- ----------------------------
-- Table structure for logistic_code_traces
-- ----------------------------
DROP TABLE IF EXISTS `logistic_code_traces`;
CREATE TABLE `logistic_code_traces` (
  `id` bigint(20) NOT NULL,
  `logistic_id` bigint(20) NOT NULL COMMENT '快递记录id',
  `accept_station` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '描述',
  `accept_time` datetime NOT NULL COMMENT '发生时间',
  `remark` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `logistic_code_traces_unique` (`logistic_id`,`accept_time`) COMMENT '这里使用运单和状态时间建立唯一索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of logistic_code_traces
-- ----------------------------
BEGIN;
INSERT INTO `logistic_code_traces` VALUES (1169538286938873858, 63176365180063744, '顺丰速运已收取快件', '2019-09-05 17:10:29', '');
INSERT INTO `logistic_code_traces` VALUES (1169538775948472322, 63176854189772800, '顺丰速运已收取快件', '2019-09-05 17:12:25', '');
INSERT INTO `logistic_code_traces` VALUES (1169539164898865154, 63177243194691584, '顺丰速运已收取快件', '2019-09-05 17:13:52', '');
INSERT INTO `logistic_code_traces` VALUES (1169540982857019393, 63179061157040128, '顺丰速运已收取快件', '2019-09-05 17:13:52', '');
INSERT INTO `logistic_code_traces` VALUES (1169543321055670274, 63181399355691008, '【温州市】  【永嘉桥头二部】（0577-28936238、0577-57683000） 的 永嘉桥头二部（13868632628） 已揽收', '2019-09-02 21:00:07', '');
INSERT INTO `logistic_code_traces` VALUES (1169543321265385473, 63181399355691008, '【温州市】  快件离开 【永嘉桥头二部】 已发往 【西安中转】', '2019-09-02 21:35:14', '');
INSERT INTO `logistic_code_traces` VALUES (1169543321277968386, 63181399355691008, '【温州市】  快件已经到达 【温州中转部】', '2019-09-03 19:52:18', '');
INSERT INTO `logistic_code_traces` VALUES (1169543321294745601, 63181399355691008, '【温州市】  快件离开 【温州中转部】 已发往 【西安中转】', '2019-09-03 19:53:20', '');
INSERT INTO `logistic_code_traces` VALUES (1169543321307328514, 63181399355691008, '【西安市】  快件已经到达 【西安中转】', '2019-09-05 05:03:25', '');
INSERT INTO `logistic_code_traces` VALUES (1169543321319911426, 63181399355691008, '【西安市】  快件离开 【西安中转】 已发往 【西安太元路】', '2019-09-05 08:13:21', '');
INSERT INTO `logistic_code_traces` VALUES (1169543321332494338, 63181399355691008, '【西安市】  快件已经到达 【西安太元路】', '2019-09-05 14:14:41', '');
INSERT INTO `logistic_code_traces` VALUES (1169543321345077249, 63181399355691008, '【西安市】  【西安太元路】 的罗马花园19号楼中通（15664634391） 正在第1次派件, 请保持电话畅通,并耐心等待（95720为中通快递员外呼专属号码，请放心接听）', '2019-09-05 14:49:37', '');
INSERT INTO `logistic_code_traces` VALUES (1169543321357660161, 63181399355691008, '【西安市】  快件已送达【快递超市的罗马花园19号楼中通快递】, 如有问题请电联（15664634391 / 029-68806920）, 感谢使用中通快递, 期待再次为您服务!', '2019-09-05 16:14:02', '');
COMMIT;

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pid` bigint(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES (1, 'USER');
INSERT INTO `role` VALUES (2, 'ADMIN');
COMMIT;

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission` (
  `role_id` bigint(11) NOT NULL,
  `permission_id` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户密码',
  `created_at` datetime NOT NULL DEFAULT '0000-01-01 00:00:00' COMMENT '注册时间',
  `enabled` bit(1) NOT NULL DEFAULT b'1' COMMENT '是否启用',
  `account_non_locked` bit(1) NOT NULL DEFAULT b'1' COMMENT '账号是否被锁定',
  `last_password_reset_date` datetime NOT NULL DEFAULT '0000-01-01 00:00:00' COMMENT '上次更新密码时间',
  `phone` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '商户手机',
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '商户省份',
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '商户城市',
  `exp_area` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '商户地区',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '详细地址',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户邮件地址，默认用来接收快递单报警信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63537931968712705 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (62454224285470720, 'admin', '$2a$10$Ii8fbk4zVGQoYlKNq8U7/u494CPwE69LNqALBuL42jPN1NiyFPDNK', '2019-09-06 15:47:21', b'1', b'1', '2019-09-06 15:47:26', '', '', '', '', '', '');
COMMIT;

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `user_id` bigint(11) NOT NULL,
  `role_id` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 1;
