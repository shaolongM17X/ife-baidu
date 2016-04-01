var schools = [
	{
		city: "北京",
		school: "北京大学",
	},
	{
		city: "京",
		school: "京大学",
	},
	{
		city: "北",
		school: "北大学",
	},
];

function main() {
	function fillInSchools() {
		function getOptionHTML(str) {
			return '<option value="'+str +'">'+str+'</option>';
		}
		var $city = $("#selectCity");
		var $school = $("#selectSchool");
		var cityToAppend_html = '';
		var schoolToAppend_html = '';
		for (var i = 0; i < schools.length; i++) {
			var city = schools[i].city;
			var school = schools[i].school;
			cityToAppend_html += getOptionHTML(city);
			schoolToAppend_html += getOptionHTML(school);
		}
		$city.append(cityToAppend_html);
		$school.append(schoolToAppend_html);

	}
	function addEventListenerForRadio($inSchool, $outOfSchool) {
		$("input[name='status'][value='在校生']").click(function() {
			$outOfSchool.hide();
			$inSchool.show();
		});
		$("input[name='status'][value='非在校生']").click(function() {
			$outOfSchool.show();
			$inSchool.hide();
		});
	}
	var status = $("input[name='status']:checked").val();
	var $inSchool = $(".inSchool");
	var $outOfSchool = $(".outOfSchool");

	if (status == '在校生') {
		$inSchool.show();
	} else {
		$outOfSchool.show();
	}
	fillInSchools();
	addEventListenerForRadio($inSchool, $outOfSchool);
}

$(document).ready(main); 