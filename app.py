# -*- coding: utf-8 -*-
'''
# test test
# test test test

@author gavinhackeling@gmail.com
'''
import os
import tornado.web
import tornado.ioloop
from tornado.options import define
from tornado.options import options


class LayoutHandler(tornado.web.RequestHandler):
	def get(self):
		self.render("layout.html")

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("main.html")

class AboutHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("about.html")

class SourcesHandler(tornado.web.RequestHandler):
 	def get(self):
 		self.render("sources.html")


handlers = [
            (r"/", MainHandler),
            (r"/about",  AboutHandler),
            (r"/sources", SourcesHandler),
            ]

# Nginx should serve /static, not Tornado
settings = dict(debug = "true", template_path = os.path.join(os.path.dirname(__file__), "templates"), static_path = os.path.join(os.path.dirname(__file__), "static"))
application = tornado.web.Application(handlers, **settings)

if __name__ == "__main__":
    application.listen(8000)
    tornado.ioloop.IOLoop.instance().start()

