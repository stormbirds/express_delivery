package cn.stormbirds.expressDelivery.utils;

import java.lang.annotation.*;

/**
 * <p>
 * cn.stormbirds.expressDelivery.utils
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/4 10:31
 */

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ExcelColumn {

    String value() default "";

    int col() default 0;
}
