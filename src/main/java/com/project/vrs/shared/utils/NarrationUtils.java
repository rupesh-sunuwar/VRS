package com.project.vrs.shared.utils;

import java.util.Map;
import java.util.regex.Matcher;

public final class NarrationUtils {

    public NarrationUtils() {
    }

    public static String compileMessage(String rawMsg, Map<String, String> props) {
        String formattedMsg = rawMsg;
        if (!isEmpty(rawMsg)) {
            formattedMsg = (String) props.keySet().stream().reduce(rawMsg, (message, key) -> {
                return message.replaceAll("\\{" + key + "\\}", Matcher.quoteReplacement((String) props.get(key)));
            });
        }

        formattedMsg = replaceAllRemaining(formattedMsg);
        return formattedMsg;
    }

    private static String replaceAllRemaining(String rawNarration) {
        return rawNarration.replaceAll("\\{.*?\\}", "N/A");
    }

    public static boolean isEmpty(String value) {
        return value == null || value.isEmpty();
    }
}
