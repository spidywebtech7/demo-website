<?php
$im = imagecreatefromjpeg('images/logo samor.jpeg');
if (!$im) die('Failed to load image');
$rgb = imagecolorat($im, 0, 0);
$colors = imagecolorsforindex($im, $rgb);
printf("#%02x%02x%02x", $colors['red'], $colors['green'], $colors['blue']);
?>
