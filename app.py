# -*- coding: utf-8 -*-
import tornado.web, tornado.ioloop
from tornado.options import define, options
import os

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("map-test.html")

class MapTestHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("map.html")


handlers = [
            (r"/", MainHandler), 
            (r"/map",  MapTestHandler),
            ]

settings = dict(template_path=os.path.join(os.path.dirname(__file__), "templates"))
application = tornado.web.Application(handlers, **settings)

if __name__ == "__main__":
    application.listen(8000)
    tornado.ioloop.IOLoop.instance().start()

