# -*- coding: utf-8 -*-
'''


@author gavinhackeling@gmail.com
'''
import os
import tornado.web
import tornado.ioloop
from tornado.options import define
from tornado.options import options


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("main.html")

class AboutHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("about.html")


handlers = [
            (r"/", MainHandler),
            (r"/about",  AboutHandler),
            ]

settings = dict(template_path=os.path.join(os.path.dirname(__file__), "templates"))
application = tornado.web.Application(handlers, **settings)

if __name__ == "__main__":
    application.listen(8000)
    tornado.ioloop.IOLoop.instance().start()

