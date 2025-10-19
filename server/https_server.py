import http.server
import ssl

def getSSLContext(certfile: str, keyfile: str):
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile, keyfile)
    context.set_ciphers("@SECLEVEL=1:ALL")
    return context

handler = http.server.SimpleHTTPRequestHandler
serverAddress = ("localhost", 5050)

httpd = http.server.HTTPServer(serverAddress, handler)

context = getSSLContext("cert.pem", "key.pem")
httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

print(f"Server started at: https://{serverAddress[0]}:{serverAddress[1]}/build/index.html")
httpd.serve_forever()
