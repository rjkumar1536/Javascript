[HOLD_CSL2.1_Func_L2A_TLI_REQ_open for editability
HOLD_CSL2.1_Func_L2A_Open Questions
GAP_CSL2.1_Func_L2A_Tender line is not eligible for revert validity exception

Hi Bala, 

 

Useful fix has been done to update validity from and validity to date at Quotation Item level.

So Header action update All item Validity period updates the validity from and to date for all Quotation item and Item Action update selected validity period updates the items validity to and from date for selected item only.

 

As we checked in Standard TMA system Item action will not update the rate table's validity from and to date.

 

Regards

Rajender

SELECT * INTO CORRESPONDING FIELDS OF TABLE et_fa_type_info
            FROM /scmtms/c_fatype FOR ALL ENTRIES IN it_fa_type_code
            WHERE fagtypeid103 = it_fa_type_code-fagtypeid103.