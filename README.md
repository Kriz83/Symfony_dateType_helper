# Symfony3 "dateType" helper

JS script to help with DateType field in Symfony3 when:
" 'widget' => 'text',   'format' => 'dd-MM-yyyy'; " 
are used to get 3 separate fields for day, month and year.

Example:
<br>
"<br>
->add('bornDate', DateType::class, array(
     'attr' => array(
           'class' => 'form-control',
           'style' => 'color:black; width:250px; height:40px'
      ),
      'label' => 'Born date :',
      'widget' => 'text',
      'format' => 'dd-MM-yyyy',
    )
)
"

Script add a calendar functionality to faster date pick too.
