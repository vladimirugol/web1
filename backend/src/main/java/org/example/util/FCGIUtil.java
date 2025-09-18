package org.example.util;

import com.fastcgi.FCGIInterface;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

public final class FCGIUtil {
    public static String readRequestBody() throws IOException {
        if (FCGIInterface.request == null) {
            return "";
        }
        FCGIInterface.request.inStream.fill();
        int contentLength = FCGIInterface.request.inStream.available();
        if (contentLength <= 0) {
            return "";
        }
        ByteBuffer buffer = ByteBuffer.allocate(contentLength);
        int readBytes = FCGIInterface.request.inStream.read(buffer.array(), 0, contentLength);
        byte[] requestBodyRaw = new byte[readBytes];
        buffer.get(requestBodyRaw);
        buffer.clear();
        return new String(requestBodyRaw, StandardCharsets.UTF_8);
    }
    public static String getRequestMethod() {
        if ((FCGIInterface.request == null) || (FCGIInterface.request.params == null)) {
            return "";
        }
        return FCGIInterface.request.params.getProperty("REQUEST_METHOD");
    }
}