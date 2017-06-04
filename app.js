var express = require("express");
var http = require("http");
var sugar = require("sugar");
var path = require("path");

var app = express();

var port = process.env.PORT || 8080;

//routing
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/:date", function(req, res)
        {
            var date = req.params.date;
            if ( date.match(/^[0-9]+$/g) ) 
                {
                    res.json({
                        "Natural date":sugar.Date(parseInt(date)).medium().raw, "Unix Timestamp":date
                    });
                } else if ( sugar.Date.create(date) > 0 ) 
                    {
                        res.json({
                        "Natural date":sugar.Date(date).medium().raw, "Unix Timestamp":sugar.Date(date).format("{x}").raw
                    });
                    } else {
                        res.end("Date not formatted properly, check it again");
                    };
        });

app.use(function(req, res)
    {
        res.status(404);
        res.send("<h1 style='text-align:center'>Page Unavailable</h1>");
    });

http.createServer(app).listen(port);
