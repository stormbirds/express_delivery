package cn.stormbirds.expressDelivery.service;

import cn.stormbirds.expressDelivery.entity.MailVo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;

/**
 * <p>
 * cn.stormbirds.expressDelivery.service
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/6 11:38
 */

@Service
@Slf4j
public class SendMailService {
    @Autowired
    private JavaMailSenderImpl mailSender;

    /**
     * 发送邮件
     */
    @Async
    public void sendMail(MailVo mailVo) {
        try {
            //1.检测邮件
            checkMail(mailVo);
            //2.发送邮件
            sendMimeMail(mailVo);
        } catch (Exception e) {
            log.error("发送邮件失败:", e);
            mailVo.setStatus("fail");
            mailVo.setError(e.getMessage());
        }

    }

    /**
     * 检测邮件信息类
     * @param mailVo
     */
    private void checkMail(MailVo mailVo) {
        if (StringUtils.isEmpty(mailVo.getTo())) {
            throw new RuntimeException("邮件收信人不能为空");
        }
        if (StringUtils.isEmpty(mailVo.getSubject())) {
            throw new RuntimeException("邮件主题不能为空");
        }
        if (StringUtils.isEmpty(mailVo.getText())) {
            throw new RuntimeException("邮件内容不能为空");
        }
    }


    /**
     * 构建复杂邮件信息类
     * @param mailVo
     */
    private void sendMimeMail(MailVo mailVo) {
        try {
            //true表示支持复杂类型
            MimeMessageHelper messageHelper = new MimeMessageHelper(mailSender.createMimeMessage(), true);
            //邮件发信人从配置项读取
            mailVo.setFrom(getMailSendFrom());
            //邮件发信人
            messageHelper.setFrom(mailVo.getFrom());
            //邮件收信人
            messageHelper.setTo(mailVo.getTo().split(","));
            //邮件主题
            messageHelper.setSubject(mailVo.getSubject());
            //邮件内容
            messageHelper.setText(mailVo.getText());

            if (!StringUtils.isEmpty(mailVo.getCc())) {
                //抄送
                messageHelper.setCc(mailVo.getCc().split(","));
            }
            if (!StringUtils.isEmpty(mailVo.getBcc())) {
                //密送
                messageHelper.setCc(mailVo.getBcc().split(","));
            }
            if (mailVo.getMultipartFiles() != null) {
                //添加邮件附件
                for (MultipartFile multipartFile : mailVo.getMultipartFiles()) {
                    messageHelper.addAttachment(multipartFile.getOriginalFilename(), multipartFile);
                }
            }
            if (mailVo.getSentDate()==null) {
                //发送时间
                mailVo.setSentDate(LocalDateTime.now());
                messageHelper.setSentDate(Date.from(mailVo.getSentDate().atZone(ZoneId.systemDefault()).toInstant()) );
            }
            mailSender.send(messageHelper.getMimeMessage());
            //正式发送邮件
            mailVo.setStatus("ok");
            log.info("发送邮件成功：{}->{}", mailVo.getFrom(), mailVo.getTo());
        } catch (Exception e) {
            //发送失败
            throw new RuntimeException(e);
        }
    }


    /**
     * 保存邮件
     * @param mailVo
     * @return
     */
    private MailVo saveMail(MailVo mailVo) {
        //将邮件保存到数据库..
        return mailVo;
    }



    /**
     * 获取邮件发信人
     * @return
     */
    public String getMailSendFrom() {
        return mailSender.getJavaMailProperties().getProperty("from");
    }

}
