method if_wlf_int_ext_map~map_head_ext_2_int.

    data lv_int_structname type strukname.
    data lv_ext_structname type strukname.
    data lr_ext_line type ref to data.
    data lr_int_line type ref to data.
    data lv_current_copy_mode type wlf_map_data_copy_mode.
    data lv_count type sy-index value 1.
    data lv_alt_struct_used type abap_bool value abap_false.

    data ls_iwlfsuplrstlst type iwlfsuplrstlst.

    field-symbols <ls_ext_line> type any.
    field-symbols <ls_int_line> type any.
    field-symbols <lv_ext_field> type any.
    field-symbols <lv_int_field> type any.
    field-symbols <lv_int_field_2> type any.
    field-symbols <lv_wdtyp> type any.
    field-symbols <ls_ext_int_field> type sty_ext_int_field.

    clear es_int_structure.

    if is_ext_structure is initial.
      return.
    endif.

    move-corresponding is_ext_structure to ls_iwlfsuplrstlst.

    cl_wlf_int_ext_mapping_helper=>get_struct_names(
      exporting
        iv_bor_obj         = mv_bor_obj_spec
        iv_map_data_cat    = cl_wzre_con=>map_data_cat-head_data
      importing
        ev_int_struct_name = lv_int_structname
        ev_ext_struct_name = lv_ext_structname ).

*--- if the external fields are mapped, the target structure can be different to the default:
    if iv_int_structname <> lv_int_structname and iv_int_structname is not initial.
      lv_int_structname = iv_int_structname.
      lv_alt_struct_used = abap_true.
    endif.

    create data lr_ext_line type (lv_ext_structname).
    assign lr_ext_line->* to <ls_ext_line>.

    create data lr_int_line type (lv_int_structname).
    assign lr_int_line->* to <ls_int_line>.

    move-corresponding is_ext_structure to <ls_ext_line>.

*--- all fields which can be mapped from the external structure are contained in the table:
    do 2 times.
      lv_current_copy_mode = lv_count.

      loop at mt_fields_map_cat_0 assigning <ls_ext_int_field>
                                  where copy_mode = lv_current_copy_mode.

        assign component <ls_ext_int_field>-ext_name of structure <ls_ext_line> to <lv_ext_field>.
        check sy-subrc = 0.

        if lv_alt_struct_used = abap_true and <ls_ext_int_field>-alt_int_name is not initial.
*--- the target structure is not the default structure KOMLFK but another one. The target field is different to
*--- the fields in the default structure. In this case, the additional fieldname is not considered. Instead of,
*--- the alternative internal fieldname is also taken as additional fieldname:
          assign component <ls_ext_int_field>-alt_int_name of structure <ls_int_line> to <lv_int_field>.
          check sy-subrc = 0.
          if <ls_ext_int_field>-int_name_2 is not initial.
*--- an additional internal fieldname is set. Take the alternative fieldname instead of:
            assign component <ls_ext_int_field>-alt_int_name of structure <ls_int_line> to <lv_int_field_2>.
            check sy-subrc = 0.
          else.
            if <lv_int_field_2> is assigned.
              unassign <lv_int_field_2>.
            endif.
          endif.
        else.
          assign component <ls_ext_int_field>-int_name of structure <ls_int_line> to <lv_int_field>.
          check sy-subrc = 0.

          if <ls_ext_int_field>-int_name_2 is not initial.
*--- an additional internal fieldname is set. The field must exist in the target structure:
            assign component <ls_ext_int_field>-int_name_2 of structure <ls_int_line> to <lv_int_field_2>.
            check sy-subrc = 0.
          else.
            if <lv_int_field_2> is assigned.
              unassign <lv_int_field_2>.
            endif.
          endif.
        endif.

        case <ls_ext_int_field>-copy_mode.
          when cl_wzre_con=>map_data_copy_mode-move.
            <lv_int_field> = <lv_ext_field>.

            if <lv_int_field_2> is assigned.
              <lv_int_field_2> = <lv_ext_field>.
            endif.

          when cl_wzre_con=>map_data_copy_mode-class.
            case <ls_ext_int_field>-ext_name.

              when 'FISCALPERIOD'.
*--- for this field, the mapping via copy-mode '2' (class) is needed because internal and external fields have different length. Therefore it is not
*--- possible to map this field via a structure which contains all fields which are mapped with copy-mode '1' (Move).
                <lv_int_field> = <lv_ext_field>.

              when others.
*--- should not occur: means that a field which has to be mapped using method is not yet considered:
                assert <ls_ext_int_field>-copy_mode = cl_wzre_con=>map_data_copy_mode-move.
            endcase.
        endcase.

      endloop.

      add 1 to lv_count.
    enddo.

*--- the settlement management document category must be set; consider that there is no corresponding field in the external structure,
*--- because this refers to Supplier Settlement Lists (which have category 'D' always):
    assign component 'WDTYP' of structure <ls_int_line> to <lv_wdtyp>.
    if sy-subrc = 0.
      <lv_wdtyp> = cl_wzre_con=>wdtyp-sl.
    endif.
    move-corresponding <ls_int_line> to es_int_structure.

  endmethod.
