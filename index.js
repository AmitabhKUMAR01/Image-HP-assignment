   $(document).ready(function () {
        $("#addAnother").click(function () {
          var newComp = $(".child-comp:first").clone();
          newComp.find("input[type='file']").val("");
          newComp.find(".imagePreview").html("No Image Selected");
          newComp.find(".imageType").val("secondary");
          $(".main").append(newComp);
          updatePrimaryOptions();
        });

        $(document).on("click", ".remove", function () {
          if ($(document).find(".child-comp").length == 1) {
            alert("You cannot delete this");
          } else {
            const selectedValue = $(this).siblings(".imageType").val();
            if (selectedValue === "primary") {
              alert("You can't remove primary image");
            } else {
              $(this).closest(".child-comp").remove();
              updatePrimaryOptions();
            }
          }
        });

        $(document).on("change", ".imageUpload", function () {
          const file = this.files[0];
          const preview = $(this).siblings(".imagePreview");
          if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
              preview.html(
                '<img src="' + event.target.result + '" alt="Image Preview">'
              );
            };
            reader.readAsDataURL(file);
          } else {
            preview.html("No Image Selected");
          }
        });

        $(document).on("change", ".imageType", function () {
          updatePrimaryOptions();
        });
        let primary_index = 0;
        function updatePrimaryOptions() {
          let primaryExists = false;
          $(".imageType").each(function () {
            if ($(this).val() === "primary") {
              primaryExists = true;
            }
          });

          if (!primaryExists) {
            $(".imageType:first").val("primary");
          }
          $(".imageType").each(function (index) {
            if ($(this).val() === "primary") {
              // $(this).closest(".child-comp").siblings().find(".imageType").val("secondary");
              primary_index = index;
              console.log(primary_index, index);
            }
          });
          console.log(primary_index);
          $(".imageType").each(function (index) {
            console.log($(this).val())
            if (index == primary_index) {
              $(this).prop("value","primary")
            } else {
              $(this).prop("value","secondary")
            }
          });
          console.log($(".imageType").get(primary_index));
        }
        updatePrimaryOptions();
      });
