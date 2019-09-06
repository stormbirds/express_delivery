package cn.stormbirds.expressDelivery.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

/**
 * <p>
 * cn.stormbirds.expressDelivery.entity
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/6 11:44
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class MailVo {

    @ApiModelProperty(value = "邮件id")
    private String id;

    @ApiModelProperty(value = "邮件发送人")
    private String from;

    @ApiModelProperty(value = "邮件接收人（多个邮箱则用逗号\",\"隔开）")
    private String to;

    @ApiModelProperty(value = "邮件主题")
    private String subject;

    @ApiModelProperty(value = "邮件内容")
    private String text;

    @ApiModelProperty(value = "发送时间")
    private LocalDateTime sentDate;

    @ApiModelProperty(value = "抄送（多个邮箱则用逗号\",\"隔开）")
    private String cc;

    @ApiModelProperty(value = "密送（多个邮箱则用逗号\",\"隔开）")
    private String bcc;

    @ApiModelProperty(value = "状态")
    private String status;

    @ApiModelProperty(value = "报错信息")
    private String error;

    @JsonIgnore
    @ApiModelProperty(value = "邮件附件")
    private MultipartFile[] multipartFiles;
}
