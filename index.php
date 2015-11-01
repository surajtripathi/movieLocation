<html>
<head>
<title>Movies shot in San Fransico, CA</title>
	<link rel="shortcut icon" type="image/png" href="favicon.ico"/>
	<script src="http://maps.googleapis.com/maps/api/js"></script>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/autocomplete.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	 <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #googleMap { height: 100%; }
      #filter {
        position:absolute; left:50px; top:100px;
      }
      #usage-panel {
		  position: absolute;
		  top  : 75%;
		  left: 2%;
		  float: left;
		  z-index: 5;
		  background-color: #fff;
		  padding: 5px;
		  border: 1px solid #999;
		  text-align: center;
	  }
      #floating-panel {
		  position: absolute;
		  top: 10px;
		  left: 10%;
		  float: left;
		  width: 25%;
		  z-index: 5;
		  background-color: #fff;
		  padding: 5px;
		  border: 1px solid #999;
		  text-align: center;
		  font-family: 'Roboto','sans-serif';
		  line-height: 30px;
		  padding-left: 5px;
		}
		.searchIco {
		  position: absolute;
		  left:35%;
		  top: 10px;
		  z-index: 6;
		  background-color: #fff;
		  padding: 5px;
		  border: 1px solid #999;
		}
    </style>
</head>
<body>
	<div id="usage-panel">Search in the box above to see the locations<br/> of the movies shot in San Francisco!</div>
	<div>
		<div  class="searchIco"><a><img id="search" src="searchicon.jpg" width="20" height="18"/></a></div> 
		<div id="floating-panel"/>
	</div>
	<div id="googleMap"/>
</body>
</html>